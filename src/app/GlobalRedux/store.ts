'use client';

import { configureStore } from '@reduxjs/toolkit';
import taskColumnsReducer from './Features/taskColumn/taskColumnSlice'
import { localStorageMiddleware } from '../../middleware/localStorageMiddleware';

export const store = configureStore({
    reducer: {
        taskColumns: taskColumnsReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(localStorageMiddleware),
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;