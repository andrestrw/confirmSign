import { useState, useEffect } from "react";
import { getThreadByToken } from "../api/threadService";
import type { ThreadResponse } from "../api/types";

export const useThread = (token1: string, token2: string) => {
  const [data, setData] = useState<ThreadResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await getThreadByToken(token1, token2);
      setData(result);
    } catch (err) {
      setError("Error fetching thread data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading, error, refetch: fetchData };
};
