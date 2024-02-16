import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from 'router/AuthProvider';
import { instance } from 'services';

type FieldType = {
  username?: string;
  password?: string;
};
const UseAuthForm = () => {
  const { setIsLogged } = useContext(UserContext);
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values: FieldType) => {
    try {
      const token = await instance.post('/user/auth', values);
      instance.defaults.headers.common['gfg_token_header_key'] = token.data;
      localStorage.setItem('token', token.data);
      setIsLogged(true);
      navigate('/');
    } catch (e) {
      setIsError(true);
      console.log(e);
    }
  };

  return { onFinish, isError };
};

export default UseAuthForm;
