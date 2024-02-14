import { IBook } from "types";

export type FieldType = {
  name?: string;
  year?: string;
  genre?: string;
  author?: string;
};

export interface ICreateForm {
  onFinish: (values: IBook) => void;
  onFinishFailed: (errorInfo: any) => void;
}