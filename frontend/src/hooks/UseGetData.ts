import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { instance } from "services";
import { IBook } from "types";

type GetBooksResponse = IBook[];

export default function UseGetData() {
  const [loading, setLoading] = useState(false);
  const [apiData, setApiData] = useState<IBook[]>([]);
  const [error, setError] = useState<AxiosError>();


  useEffect(() => {
    setLoading(true);
    instance
      .get<GetBooksResponse>('book')
      .then((res) => {
        setApiData(res.data);
        setLoading(false);
      })
      .catch((error) => setError(error));
  }, []);

  return {loading, apiData, error}
}
