import {
  ContentWrapper,
  CreateForm,
  EditableCell,
  TableContainer,
} from 'components';
import React, { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { Button, Flex, Form, Popconfirm, Table } from 'antd';
import { IBook } from 'types';
import {
  DeleteOutlined,
  EditOutlined,
  RollbackOutlined,
  SaveOutlined,
} from '@ant-design/icons';

const boxStyle: React.CSSProperties = {
  width: '100%',
  height: 120,
  borderRadius: 6,
  border: '1px solid #40a9ff',
};

type GetBooksResponse = IBook[];

const App = () => {
  const [form] = Form.useForm();
  const [bookList, setBookList] = useState<undefined | IBook[]>(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AxiosError>();
  const [editingKey, setEditingKey] = useState('');

  const isEditing = (record: IBook) => record.id.toString() === editingKey;

  const onFinish = (values: IBook) => {
    axios.post<IBook>('http://localhost:5000/book', values).then((res) =>
      setBookList((prevState) => {
        if (prevState) {
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
      await axios.delete('http://localhost:5000/book/' + item.id);
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

        await axios.put(`http://localhost:5000/book/${item.id}`, {
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
          <span>
            <Button
              onClick={() => save(record.id)}
              style={{ marginRight: 8 }}
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
          </span>
        ) : (
          <Flex gap={'12px'} align={'center'}>
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
          </Flex>
        );
      },
    },
  ];

  useEffect(() => {
    setLoading(true);
    axios
      .get<GetBooksResponse>('http://localhost:5000/books')
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
    <ContentWrapper>
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
  );
};

export default App;
