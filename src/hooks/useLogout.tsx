import { logoutRequest } from "../api/authRequest";
import { axiosPrivate } from "../api/axios";
import useAuth from "./useAuth";

const useLogout = () => {
  const { setAuth } = useAuth();

  const logout = async () => {
    try {
      logoutRequest();
      setAuth({});
      axiosPrivate.defaults.headers.common["Authorization"] = "";
      localStorage.removeItem("auth");
    } catch (err) {
      console.error(err);
    }
  };

  return logout;
};

export default useLogout;
