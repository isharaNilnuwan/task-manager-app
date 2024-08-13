'use client';

import { configureStore } from '@reduxjs/toolkit';
import taskColumnsReducer from './Features/taskColumn/taskColumnSlice'

export const store = configureStore({
    reducer: {
        taskColumns: taskColumnsReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;