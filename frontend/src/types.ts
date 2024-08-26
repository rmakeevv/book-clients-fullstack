import { Dispatch, SetStateAction } from 'react';

export interface IBook {
    id: number;
    name: string;
    year: number;
    genre: string;
    author: string;
    instock: number;
}

export type SetBookList = Dispatch<SetStateAction<IBook[] | undefined>>;

export type BookList = IBook[] | undefined;
