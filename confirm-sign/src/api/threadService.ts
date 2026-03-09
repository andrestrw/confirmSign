import axios from "axios";
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

export const acceptThread = async (token1: string, token2: string) => {
  const url = `/veremail/${token1}/${token2}`;

  const response = await axios.post(url);
  const data = response.data;

  if (typeof data === "string" && data.includes("<html")) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(data, "text/html");
    const title = doc.title;

    if (title.includes("Confirmsign Dove")) {
      return { success: true, title };
    }

    if (title.toLowerCase().includes("an error occurred")) {
      throw new Error(`Error en el servidor:  `);
    }
  }

  return data;
};
