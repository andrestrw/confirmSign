import axiosInstance from "./axiosInstance";
import type { ThreadResponse } from "./types";

export const getThreadByToken = async (
  token1: string,
  token2: string,
): Promise<ThreadResponse> => {
  const response = await axiosInstance.get<ThreadResponse>(
    `/threads/token/${token1}/${token2}`,
  );
  return response.data;
};
