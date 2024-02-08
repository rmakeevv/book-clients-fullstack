import { Button, Form, Input } from 'antd';
import React from 'react';
import { IBook } from 'types';

type FieldType = {
  name?: string;
  year?: string;
  genre?: string;
  author?: string;
};

interface ICreateForm {
  onFinish: (values: IBook) => void;
  onFinishFailed: (errorInfo: any) => void;
}

const CreateForm = ({ onFinish, onFinishFailed }: ICreateForm) => {
  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: '600px' }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item<FieldType>
        label="Название"
        name="name"
        rules={[{ required: true, message: 'Пожалуйста, введите название!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="Год"
        name="year"
        rules={[{ required: true, message: 'Пожалуйста, введите год!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item<FieldType>
        label="Жанр"
        name="genre"
        rules={[{ required: true, message: 'Пожалуйста, введите жанр!!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item<FieldType>
        label="Автор"
        name="author"
        rules={[{ required: true, message: 'Пожалуйста, введите автора!!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateForm;
