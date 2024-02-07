import TableContainer from 'components/TableContainer';
import React, { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { Flex, Table } from 'antd';
import type { TableProps } from 'antd';
import { IBook } from 'types';

const boxStyle: React.CSSProperties = {
  width: '100%',
  height: 120,
  borderRadius: 6,
  border: '1px solid #40a9ff',
};

type GetBooksResponse = IBook[];

const columns: TableProps<IBook>['columns'] = [
  {
    title: 'Id',
    dataIndex: 'id',
    key: 'id',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Year',
    dataIndex: 'year',
    key: 'year',
  },
  {
    title: 'Genre',
    key: 'genre',
    dataIndex: 'genre',
  },
  {
    title: 'Author',
    key: 'author',
    dataIndex: 'author',
  },
];

const App = () => {
  const [bookList, setBookList] = useState<undefined | IBook[]>(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AxiosError>();

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

  if (error)
    return (
      <Flex align={'center'} justify={'center'} style={boxStyle} vertical>
        <p>{error.message}</p>
        <span>Не удалось загрузить данные!</span>
      </Flex>
    );

  return (
    <TableContainer>
      <Table
        rowKey={(book) => book.id}
        columns={columns}
        dataSource={bookList}
        loading={loading}
      />
    </TableContainer>
  );
};

export default App;
