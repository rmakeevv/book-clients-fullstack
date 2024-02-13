import { useNavigate } from 'react-router-dom';

export default function UseLogOut() {
  const navigate = useNavigate();
  const logOut = () => {
    localStorage.clear();
    navigate('/auth');
  };
  return logOut;
}
