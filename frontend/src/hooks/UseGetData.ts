import { AxiosError } from 'axios';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { instance } from 'services';
import { IBook } from 'types';

type GetBooksResponse = IBook[];

type UseGetDataArg = Dispatch<SetStateAction<IBook[] | undefined>>;

export default function UseGetData(setBookList: UseGetDataArg) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AxiosError>();

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

  return { loading, error };
}
