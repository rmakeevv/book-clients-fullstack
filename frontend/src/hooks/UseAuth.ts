import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { instance } from 'services';

export const UseAuth = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const localToken = localStorage.getItem('token');
    if (localToken) {
      instance.defaults.headers.common['gfg_token_header_key'] = localToken;
      instance
        .get('/user/validateToken')
        .then(() => navigate('/'))
        .catch(() => {
          localStorage.clear();
          navigate('/auth');
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
      navigate('/auth');
    }
  }, []);

  return loading;
};
