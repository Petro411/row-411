import baseApi, { endpoints } from "@/services/api";
import { getItem } from "@/utils/Localstorage";
import { destroyCookie } from "nookies";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type Props = {
  children: ReactNode;
};

const AuthContext = createContext<any>(null);
export const getUser = () => {
  return useContext(AuthContext);
};

const AuthContextProvider = ({ children }: Props) => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const token = getItem("token");
    const getUserInfo = async () => {
      try {
        const res = await baseApi.get(endpoints.lookup, {
          headers: { Authorization: token },
        });
        setUser(res.data?.user);
      } catch (error) {
        destroyCookie(null, "token");
        baseApi.get(endpoints.logout);
      }
    };
    if (!user && token) {
      getUserInfo();
    }
  }, [getItem("token")]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
