import { useState, useEffect } from "react";
import { getThreadByToken } from "../api/threadService";
import type { ThreadResponse } from "../api/types";

export const useThread = (token1: string, token2: string) => {
  const [data, setData] = useState<ThreadResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Llamamos a nuestra capa de servicio
        const result = await getThreadByToken(token1, token2);
        setData(result);
      } catch (err) {
        setError("Error fetching thread data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (token1 && token2) {
      fetchData();
    }
  }, [token1, token2]);

  return { data, loading, error };
};
