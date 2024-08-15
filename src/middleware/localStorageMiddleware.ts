import { TaskLocalSorageKey } from "@/constants/constants";


export const localStorageMiddleware = (store: any) => (next: any) => (action: any) => {
  const result = next(action);
  
  if (action.type === 'taskColumns/updateTaskColumns' ||
      action.type === 'taskColumns/addTaskToColumn' ||
      action.type === 'taskColumns/removeTaskFromColumn' ||
      action.type === 'taskColumns/updateTaskItem') {

    const state = store.getState();
    localStorage.setItem(TaskLocalSorageKey, JSON.stringify(state.taskColumns));
  }

  return result;
};
