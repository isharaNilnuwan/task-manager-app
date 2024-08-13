import { Priority, TaskTypes } from "@/constants/constants";
import { TaskColumnsProps, TaskConfigs } from "@/types/task.types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";


const initialState: TaskColumnsProps = {
  [TaskTypes.ToDo]: {
    title: TaskTypes.ToDo,
    items: [],
  },
  [TaskTypes.InProgress]: {
    title: TaskTypes.InProgress,
    items: [],
  },
  [TaskTypes.Complete]: {
    title: TaskTypes.Complete,
    items: [],
  },
};

const taskColumnsSlice = createSlice({
  name: "taskColumns",
  initialState,
  reducers: {
    updateTaskColumns(state, action: PayloadAction<TaskColumnsProps>) {
      return action.payload;
    },

    addTaskToColumn(
      state,
      action: PayloadAction<{ type: TaskTypes; task: TaskConfigs }>
    ) {
      const { type, task } = action.payload;
      if (state[type]) {
        state[type].items.push(task);
      } else {
        console.error(`Column type ${type} does not exist in state.`);
      }
    },

    removeTaskFromColumn(
      state,
      action: PayloadAction<{ type: TaskTypes; taskId: string }>
    ) {
      const { type, taskId } = action.payload;
      state[type].items = state[type].items.filter(
        (item) => item.id !== taskId
      );
    },
  },
});

export const { updateTaskColumns, addTaskToColumn, removeTaskFromColumn } =
  taskColumnsSlice.actions;

export default taskColumnsSlice.reducer;
