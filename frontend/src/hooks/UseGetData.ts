import { AxiosError } from 'axios';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { getAllBooks } from 'services';
import { IBook } from 'types';
type UseGetDataArg = Dispatch<SetStateAction<IBook[] | undefined>>;

export default function UseGetData(setBookList: UseGetDataArg) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AxiosError>();

  useEffect(() => {
    setLoading(true);
    getAllBooks()
      .then((data) => {
        setBookList(data);
        setLoading(false);
      })

      .catch((error) => setError(error));
  }, []);

  return { loading, error };
}
