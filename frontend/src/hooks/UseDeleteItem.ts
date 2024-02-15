import { deleteOneBook } from 'services';
import { IBook } from 'types';

type UseDeleteItemType = (
  bookList: IBook[] | undefined,
  setBookList: (values: IBook[]) => void
) => (item: IBook) => Promise<void>;

export const UseDeleteItem: UseDeleteItemType = (bookList, setBookList) => {
  return async (item: IBook) => {
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
};
