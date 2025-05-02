import baseApi, { endpoints } from "@/services/api";
import GetApiErrorMessage from "@/utils/GetApiErrorMessage";
import { getItem } from "@/utils/Localstorage";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import toast from "react-simple-toasts";

type Props = {
  children: ReactNode;
};

const AuthContext = createContext<any>(null);
export const getUser = ()=>{
    return useContext(AuthContext);
}

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
        toast(GetApiErrorMessage(error));
      }
    };
    if (!user && token) {
      getUserInfo();
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
