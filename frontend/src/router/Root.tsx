import { ContentWrapper, CreateForm, EditableCell, Header } from 'components';
import React, { useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import { Button, Flex, Form, message, Popconfirm, Space, Table } from 'antd';
import { IBook } from 'types';
import {
  DeleteOutlined,
  EditOutlined,
  RollbackOutlined,
  SaveOutlined,
} from '@ant-design/icons';
import UseLogOut from 'hooks/UseLogOut';
import {
  createOneBook,
  deleteOneBook,
  editOneBook,
  getAllBooks,
} from 'services';

const Root = () => {
  const [form] = Form.useForm();
  const [bookList, setBookList] = useState<undefined | IBook[]>(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AxiosError>();
  const [editingKey, setEditingKey] = useState('');
  const [messageApi, contextHolder] = message.useMessage();

  const logOut = UseLogOut();

  const showSuccessMessage = (content: string) => {
    messageApi.open({
      type: 'success',
      content,
    });
  };

  const isEditing = (record: IBook) => record.id.toString() === editingKey;

  const onFinish = async (values: IBook) => {
    const data = await createOneBook(values);

    data &&
      setBookList((prevState) => {
        if (prevState) {
          showSuccessMessage('Запись успешно добавлена!');
          return [data, ...prevState];
        }
        return [];
      });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const edit = (record: Partial<IBook>) => {
    form.setFieldsValue({ ...record });
    setEditingKey(record.id ? record.id.toString() : ' ');
  };

  const cancel = () => {
    setEditingKey('');
  };

  const deleteRecord = async (item: IBook) => {
    try {
      await deleteOneBook(item.id);
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

        await editOneBook({ ...item, ...row });

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
      width: '70px',
    },
    {
      title: 'Количество',
      dataIndex: 'instock',
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
      width: '130px',
      dataIndex: 'operation',
      render: (_: any, record: IBook) => {
        const editable = isEditing(record);
        return editable ? (
          <Space>
            <Button
              onClick={() => save(record.id)}
              type={'default'}
              size={'large'}
              icon={<SaveOutlined />}
            ></Button>
            <Popconfirm
              title="Уверены, что хотите отменить?"
              onConfirm={cancel}
            >
              <Button size={'large'} icon={<RollbackOutlined />}></Button>
            </Popconfirm>
          </Space>
        ) : (
          <Space>
            <Button
              type={'default'}
              size={'large'}
              disabled={editingKey !== ''}
              onClick={() => edit(record)}
              icon={<EditOutlined />}
            ></Button>
            <Popconfirm
              title="Уверены, что хотите удалить?"
              onConfirm={() => deleteRecord(record)}
            >
              <Button
                type={'default'}
                size={'large'}
                icon={<DeleteOutlined />}
              ></Button>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  useEffect(() => {
    setLoading(true);
    getAllBooks()
      .then((data) => {
        setBookList(data);
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
        inputType:
          col.dataIndex === 'year' || col.dataIndex === 'instock'
            ? 'number'
            : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  if (error)
    return (
      <Flex align={'center'} justify={'center'} vertical>
        <p>{error.message}</p>
        <span>Не удалось загрузить данные!</span>
      </Flex>
    );

  return (
    <div>
      <Header logOut={logOut} />
      <ContentWrapper>
        {contextHolder}

        <CreateForm onFinish={onFinish} onFinishFailed={onFinishFailed} />

        <div style={{ padding: '20px ', flexGrow: 1 }}>
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
        </div>
      </ContentWrapper>
    </div>
  );
};

export default Root;
