import {
  ContentWrapper,
  CreateForm,
  EditableCell,
  TableContainer,
} from 'components';
import React, { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { Button, Flex, Form, message, Popconfirm, Space, Table } from 'antd';
import { IBook } from 'types';
import {
  DeleteOutlined,
  EditOutlined,
  RollbackOutlined,
  SaveOutlined,
} from '@ant-design/icons';
import Header from 'components/Header';

const boxStyle: React.CSSProperties = {
  width: '100%',
  height: 120,
  borderRadius: 6,
  border: '1px solid #40a9ff',
};

type GetBooksResponse = IBook[];

const Root = () => {
  const token = localStorage.getItem('token');
  const [form] = Form.useForm();
  const [bookList, setBookList] = useState<undefined | IBook[]>(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AxiosError>();
  const [editingKey, setEditingKey] = useState('');
  const [messageApi, contextHolder] = message.useMessage();

  const instance = axios.create({
    baseURL: 'http://localhost:5000/',
    headers: { gfg_token_header_key: token },
  });

  const showSuccessMessage = (content: string) => {
    messageApi.open({
      type: 'success',
      content,
    });
  };

  const isEditing = (record: IBook) => record.id.toString() === editingKey;

  const onFinish = (values: IBook) => {
    instance.post<IBook>('book', values).then((res) =>
      setBookList((prevState) => {
        if (prevState) {
          showSuccessMessage('Запись успешно добавлена!');
          return [res.data, ...prevState];
        }
        return [];
      })
    );
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const edit = (record: Partial<IBook>) => {
    form.setFieldsValue({ name: '', age: '', address: '', ...record });
    setEditingKey(record.id ? record.id.toString() : ' ');
  };

  const cancel = () => {
    setEditingKey('');
  };

  const deleteRecord = async (item: IBook) => {
    try {
      await instance.delete('book/' + item.id);
      const newData = bookList?.length ? [...bookList] : [];
      const index = newData.findIndex((newItem) => item.id === newItem.id);
      newData.splice(index, 1);
      setBookList(newData);
    } catch (e) {
      console.log(e);
    }
  };

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as IBook;
      const newData = bookList?.length ? [...bookList] : [];
      const index = newData.findIndex((item) => key === item.id);
      if (index > -1) {
        const item = newData[index];

        await instance.put(`book/${item.id}`, {
          ...item,
          ...row,
        });
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setBookList(newData);

        setEditingKey('');
      } else {
        newData.push(row);
        setBookList(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: 'Название',
      dataIndex: 'name',
      editable: true,
    },
    {
      title: 'Год',
      dataIndex: 'year',
      editable: true,
    },
    {
      title: 'Жанр',
      editable: true,
      dataIndex: 'genre',
    },
    {
      title: 'Автор',
      editable: true,
      dataIndex: 'author',
    },
    {
      title: 'Действия',
      dataIndex: 'operation',
      render: (_: any, record: IBook) => {
        const editable = isEditing(record);
        return editable ? (
          <Space>
            <Button
              onClick={() => save(record.id)}
              type={'default'}
              size={'large'}
            >
              <SaveOutlined />
            </Button>
            <Popconfirm
              title="Уверены, что хотите отменить?"
              onConfirm={cancel}
            >
              <Button size={'large'}>
                <RollbackOutlined />
              </Button>
            </Popconfirm>
          </Space>
        ) : (
          <Space>
            <Button
              type={'default'}
              size={'large'}
              disabled={editingKey !== ''}
              onClick={() => edit(record)}
            >
              <EditOutlined />
            </Button>
            <Popconfirm
              title="Уверены, что хотите удалить?"
              onConfirm={() => deleteRecord(record)}
            >
              <Button type={'default'} size={'large'}>
                <DeleteOutlined />
              </Button>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  useEffect(() => {
    setLoading(true);
    instance
      .get<GetBooksResponse>('book')
      .then((res) => {
        setBookList(res.data);
        setLoading(false);
      })
      .catch((error) => setError(error));
  }, []);

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: IBook) => ({
        record,
        inputType: col.dataIndex === 'year' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  if (error)
    return (
      <Flex align={'center'} justify={'center'} style={boxStyle} vertical>
        <p>{error.message}</p>
        <span>Не удалось загрузить данные!</span>
      </Flex>
    );

  return (
    <div>
      <Header />
      <ContentWrapper>
        {contextHolder}
        <CreateForm onFinish={onFinish} onFinishFailed={onFinishFailed} />
        <TableContainer>
          <Form form={form} component={false}>
            <Table
              columns={mergedColumns}
              rowKey={(item: IBook) => item.id}
              components={{
                body: {
                  cell: EditableCell,
                },
              }}
              bordered
              dataSource={bookList}
              rowClassName="editable-row"
              pagination={{
                onChange: cancel,
              }}
              loading={loading}
            />
          </Form>
        </TableContainer>
      </ContentWrapper>
    </div>
  );
};

export default Root;
