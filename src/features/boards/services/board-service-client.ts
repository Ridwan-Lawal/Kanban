import { UserBoards, UserBoardsResponse } from "@/features/boards/types/boards-service-interface";
import { axiosApi } from "@/lib/axios";
import { isAxiosError } from "axios";
import { cache } from "react";

export const getUserBoardsForClient = cache(async function (): Promise<UserBoards[]> {
  try {
    const res = await axiosApi.get<UserBoardsResponse<UserBoards>>("/api/boards");

    return res.data.data;
  } catch (error) {
    let message = "Something went wrong trying to get boards data";

    if (process.env.NODE_ENV === "development") {
      console.log(error);
    }

    if (isAxiosError(error)) {
      if (error.response?.status) {
        message = message;
      } else if (error.request) {
        message = "Please connect to the internet";
      }
    }

    throw new Error(message);
  }
});
