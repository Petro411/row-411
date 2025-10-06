import baseApi from "@/services/api";
import { label } from "@/branding";
import { useState } from "react";


export const useMutation = (endpoint:string) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);

  const request = async (payload: any, path?:string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await baseApi.post(path ? path : endpoint, payload);
      setData(response.data);
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || label.SomethingWentWrong);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { request, loading, error, data };
};
