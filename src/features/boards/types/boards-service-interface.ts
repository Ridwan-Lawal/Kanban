export interface UserBoardsResponse<T> {
  success: boolean;
  data: T[];
}

export interface UserBoards {
  id: string;
  name: string;
  createdAt: Date;
  userId: string;
  columns: Column[];
}

export interface Column {
  id: string;
  name: string;
  createdAt: Date;
  boardId: string;
}
