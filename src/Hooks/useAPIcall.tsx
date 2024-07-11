import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { BASE_API } from "../Config/api";

type methodType = "get" | "post" | "put";

const useAPIcall = (url: string, method: methodType, data: any = {}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<any>();
  const [isSuccessfullyFetched, setIsSuccessfullyFetched] =
    useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  const fetchAPI = useCallback(async () => {
    setIsLoading(true);
    setIsSuccessfullyFetched(false);
    setError(null);

    try {
      const response = await axios({
        method: method,
        url: BASE_API + url,
        data: data,
      });
      setResponse(response.data);
      setIsSuccessfullyFetched([200, 201].includes(response.status));
    } catch (err) {
      setError(err);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [url, method, data]);

  useEffect(() => {
    fetchAPI();
  }, [fetchAPI]);

  return { isLoading, response, isSuccessfullyFetched, error };
};

export default useAPIcall;
