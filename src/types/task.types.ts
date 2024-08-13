import { Priority, TaskTypes } from "@/constants/constants";

export interface TaskConfigs {
    id : string;
    name : string;
    type : TaskTypes;
    description: string;
    date: string;
    user: User;
    priority: Priority;
}

export interface User {
    id: string
    name : string;
    avatar: string;
}

export interface TaskColumn {
    title: TaskTypes;
    items: TaskConfigs[];
}

export type TaskColumnsProps = {
    [key: string]: TaskColumn;
};