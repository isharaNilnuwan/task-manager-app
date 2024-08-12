import { Priority, TaskTypes } from "@/constants/constants";

export interface TaskConfigs {
    name : string;
    type : TaskTypes;
    description: string;
    date: string;
    user: User;
    priority: Priority;
}

export interface User {
    name : string;
    avatar: string;
}