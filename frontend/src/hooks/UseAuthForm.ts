import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { instance } from "services";

type FieldType = {
  username?: string;
  password?: string;
};

export const UseAuthForm = () => {
  const navigate = useNavigate();
  const [isError, setIsError] = useState(false);

  const onFinish = async (values: FieldType) => {
    try {
      const token = await instance.post('/user/auth', values);
      instance.defaults.headers.common['gfg_token_header_key'] = token.data;
      localStorage.setItem('token', token.data);

      navigate('/');
    } catch (e) {
      setIsError(true);
      console.log(e);
    }
  };

  return {onFinish, isError};
}