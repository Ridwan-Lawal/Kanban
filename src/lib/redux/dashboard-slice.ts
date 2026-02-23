import { UserBoards } from "@/features/boards/types/boards-service-interface";
import { RootState } from "@/lib/redux/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DashboardSliceType {
  isAddBoardFormOpen: boolean;
  boardToEdit: UserBoards | undefined | null;
  isBoardsMenuListOpen: boolean;
  boardToDeleteId: string | null;
  isDeleteModalBoardOpen: boolean;
  isNewColumnsModalOpen: boolean;
}

const initialState: DashboardSliceType = {
  isAddBoardFormOpen: false,
  boardToEdit: null,
  isBoardsMenuListOpen: false,
  boardToDeleteId: null,
  isDeleteModalBoardOpen: false,
  isNewColumnsModalOpen: false,
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    handleNewColumnsModalToggle(state, action: PayloadAction<boolean | undefined>) {
      if (action.payload !== undefined) {
        state.isNewColumnsModalOpen = action.payload;
      } else {
        state.isNewColumnsModalOpen = !state.isNewColumnsModalOpen;
      }
    },

    handleBoardMenuListToggle(state, action: PayloadAction<boolean | undefined>) {
      if (action.payload !== undefined) {
        state.isBoardsMenuListOpen = action.payload;
      } else {
        state.isBoardsMenuListOpen = !state.isBoardsMenuListOpen;
      }
    },

    handleAddBoardFormToggle(state) {
      state.isAddBoardFormOpen = !state.isAddBoardFormOpen;
    },

    handleAddBoardToEdit(state, action: PayloadAction<UserBoards | undefined | null>) {
      state.boardToEdit = action.payload;
    },

    handleAddBoardToDeleteId(state, action: PayloadAction<string | null>) {
      state.boardToDeleteId = action.payload;
    },

    handleDeleteBoardModalToggle(state, action: PayloadAction<boolean | undefined>) {
      if (action.payload !== undefined) {
        state.isDeleteModalBoardOpen = action.payload;
      } else {
        state.isDeleteModalBoardOpen = !state.isDeleteModalBoardOpen;
      }
    },
  },
});

export const {
  handleNewColumnsModalToggle,
  handleAddBoardFormToggle,
  handleAddBoardToEdit,
  handleBoardMenuListToggle,
  handleAddBoardToDeleteId,
  handleDeleteBoardModalToggle,
} = dashboardSlice.actions;

export const selectDashboard = (state: RootState) => state.dashboard;

export default dashboardSlice.reducer;
