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
    updateTaskItem(
      state,
      action: PayloadAction<{ type: TaskTypes; task: TaskConfigs }>
    ) {
      const { type, task } = action.payload;
      if (state[type]) {
        const taskIndex = state[type].items.findIndex(item => item.id === task.id);
        
        if (taskIndex !== -1) {
          state[type].items[taskIndex] = task;
        } else {
          state[type].items.push(task);
        }
      } else {
        console.error(`Column type ${type} does not exist in state.`);
      }
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

export const { updateTaskColumns, addTaskToColumn, removeTaskFromColumn, updateTaskItem } =
  taskColumnsSlice.actions;

export default taskColumnsSlice.reducer;
