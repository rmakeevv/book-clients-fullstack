import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

export default function AuthProvider() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const localToken = localStorage.getItem('token');
    if (localToken) {
      axios
        .get('http://localhost:5000/user/validateToken', {headers : {gfg_token_header_key: localToken}
          
        })
        .then(() => navigate('/'))
        .catch(() => navigate('/auth'))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
      navigate('/auth')
    }
  }, []);

  if (!loading)
    return (
      <div>
        <Outlet />
      </div>
    );

  return <></>;
}
