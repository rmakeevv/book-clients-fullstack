import { Form, Input, InputNumber } from 'antd';
import React, { useMemo } from 'react';
import { EditableCellProps } from './types';

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = useMemo(
    () => (inputType === 'number' ? <InputNumber /> : <Input />),
    [inputType]
  );

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

export default EditableCell;
