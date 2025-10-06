import { useState, useRef, useEffect } from "react";
import baseApi from "@/services/api";
import { label } from "@/branding";


export const useQuery = (endpoint?: string) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);

  const controllerRef = useRef<AbortController | null>(null);

  const request = async (path?: string) => {
    setLoading(true);
    setError(null);

    if (controllerRef.current) {
      controllerRef.current.abort();
    }

    const controller = new AbortController();
    controllerRef.current = controller;

    try {
      const response = await baseApi.get(path ? path : endpoint ? endpoint : "", {
        signal: controller.signal,
      });

      setData(response.data);
      return response.data;
    } catch (err: any) {
      if (err.name === "AbortError") {
        console.log("Request was aborted");
        return;
      }
      setError(
        err.response?.data?.message || err.message || label.SomethingWentWrong
      );
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      if(controllerRef?.current){
        controllerRef.current?.abort();
      }
    };
  }, []);

  return { request, loading, error, data, abort: () => controllerRef.current?.abort() };
};
