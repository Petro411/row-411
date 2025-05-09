import Label from "@/config/Label";
import baseApi from "@/services/api";
import { useState, useRef, useEffect } from "react";

export const useQuery = (endpoint: string) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);

  const controllerRef = useRef<AbortController | null>(null);

  const request = async () => {
    setLoading(true);
    setError(null);

    if (controllerRef.current) {
      controllerRef.current.abort();
    }

    const controller = new AbortController();
    controllerRef.current = controller;

    try {
      const response = await baseApi.get(endpoint, {
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
        err.response?.data?.message || err.message || Label.SomethingWentWrong
      );
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      controllerRef.current?.abort();
    };
  }, []);

  return { request, loading, error, data, abort: () => controllerRef.current?.abort() };
};
