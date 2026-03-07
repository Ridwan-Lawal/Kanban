import { UserBoards } from "@/features/boards/types/boards-service-interface";
import { ColumnType } from "@/features/tasks/types/tasks-types";
import { RootState } from "@/lib/redux/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TaskInViewType = ColumnType[number]["tasks"][number];

interface DashboardSliceType {
  isAddBoardFormOpen: boolean;
  boardToEdit: UserBoards | undefined | null;
  isBoardsMenuListOpen: boolean;
  boardToDeleteId: string | null;
  isDeleteModalBoardOpen: boolean;
  isDeleteTaskModalOpen: boolean;
  isNewColumnsModalOpen: boolean;
  isAddNewTaskModalOpen: boolean;
  currentTaskInView: TaskInViewType | null;
  boardToDeleteName: string | null;
  taskToEdit: TaskInViewType | null;
  isSidebarOpen: boolean;
  isDarkmode: boolean;
}

const initialState: DashboardSliceType = {
  isAddBoardFormOpen: false,
  boardToEdit: null,
  isBoardsMenuListOpen: false,
  boardToDeleteId: null,
  boardToDeleteName: null,
  isDeleteModalBoardOpen: false,
  isNewColumnsModalOpen: false,
  isAddNewTaskModalOpen: false,
  currentTaskInView: null,
  isDeleteTaskModalOpen: false,
  taskToEdit: null,
  isSidebarOpen: false,
  isDarkmode: true,
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    toggleTheme(state, action: PayloadAction<boolean | undefined>) {
      if (action.payload !== undefined) {
        state.isDarkmode = action.payload;
      } else {
        state.isDarkmode = !state.isDarkmode;
      }
    },
    toggleSidebar(state) {
      state.isSidebarOpen = !state.isSidebarOpen;
    },

    toggleSubstackStatus(state, action: PayloadAction<{ subtaskToUpdateId: string }>) {
      const { subtaskToUpdateId } = action.payload;
      if (!state.currentTaskInView) return;

      const updatedSubtasks = state.currentTaskInView.subtasks.map((subtask) =>
        subtask.id === subtaskToUpdateId ? { ...subtask, status: !subtask.status } : subtask,
      );

      state.currentTaskInView = { ...state.currentTaskInView, subtasks: updatedSubtasks };
    },
    AddCurrentTaskInView(state, action: PayloadAction<TaskInViewType | null>) {
      state.currentTaskInView = action.payload;
    },

    addTaskToEdit(state, action: PayloadAction<TaskInViewType | null>) {
      state.taskToEdit = action.payload;
    },

    handleAddNewTaskModalToggle(state, action: PayloadAction<boolean | undefined>) {
      state.taskToEdit = null;
      if (action.payload !== undefined) {
        state.isAddNewTaskModalOpen = action.payload;
      } else {
        state.isAddNewTaskModalOpen = !state.isAddNewTaskModalOpen;
      }
    },

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

    handleAddBoardToDeleteName(state, action: PayloadAction<string | null>) {
      state.boardToDeleteName = action.payload;
    },

    handleDeleteBoardModalToggle(state, action: PayloadAction<boolean | undefined>) {
      if (action.payload !== undefined) {
        state.isDeleteModalBoardOpen = action.payload;
      } else {
        state.isDeleteModalBoardOpen = !state.isDeleteModalBoardOpen;
      }
    },

    handleDeleteTaskModalToggle(state, action: PayloadAction<boolean | undefined>) {
      if (action.payload !== undefined) {
        state.isDeleteTaskModalOpen = action.payload;
      } else {
        state.isDeleteTaskModalOpen = !state.isDeleteTaskModalOpen;
      }
    },
  },
});

export const {
  toggleTheme,
  toggleSidebar,
  addTaskToEdit,
  handleAddBoardToDeleteName,
  toggleSubstackStatus,
  AddCurrentTaskInView,
  handleNewColumnsModalToggle,
  handleAddBoardFormToggle,
  handleAddBoardToEdit,
  handleBoardMenuListToggle,
  handleAddBoardToDeleteId,
  handleDeleteBoardModalToggle,
  handleAddNewTaskModalToggle,
  handleDeleteTaskModalToggle,
} = dashboardSlice.actions;

export const selectDashboard = (state: RootState) => state.dashboard;

export default dashboardSlice.reducer;
