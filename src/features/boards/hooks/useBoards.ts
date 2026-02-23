import { getUserBoardsForClient } from "@/features/boards/services/board-service-client";
import { useQuery } from "@tanstack/react-query";

export function useGetBoards() {
  const queryResult = useQuery({
    queryKey: ["get-boards"],
    queryFn: getUserBoardsForClient,
    refetchInterval: 5000,
  });

  return queryResult;
}
