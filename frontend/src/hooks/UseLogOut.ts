export default function UseLogOut(setIsLogged: (value: boolean) => void) {
  const logOut = () => {
    localStorage.clear();
    setIsLogged(false);
  };
  return logOut;
}
