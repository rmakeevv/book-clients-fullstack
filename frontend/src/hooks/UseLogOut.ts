import { useContext } from "react";
import { UserContext } from "router/AuthProvider";

export default function UseLogOut() {
  const {setIsLogged} = useContext(UserContext);
  const logOut = () => {
    localStorage.clear();
    setIsLogged(false);
  };
  return logOut;
}
