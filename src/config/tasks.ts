import { DeadLineStatus, Priority, TaskTypes } from "@/constants/constants";
import { contentStyleProps, TaskColumnsProps, TaskConfigs } from "@/types/task.types";
import { v4 as uuidv4 } from "uuid";

export const TodoList: TaskConfigs[] = [
  {
    id: "1723491809218",
    name: "Task 1",
    type: TaskTypes.ToDo,
    description: "",
    date: "2024-08-12T07:35:30.402Z",
    user: {
      id: "1",
      name: "Ishara Nilnuwan",
      avatar: "",
    },
    priority: Priority.Low,
  },
  {
    id: "1723491839460",
    name: "Task 2",
    type: TaskTypes.ToDo,
    description: "this is task 2",
    date: "2024-08-12T07:35:30.402Z",
    user: {
      id: "2",
      name: "kamel thabeth",
      avatar: "",
    },
    priority: Priority.High,
  },
  {
    id: "1723491849465",
    name: "Task 3",
    type: TaskTypes.ToDo,
    description: "this is task3 ",
    date: "2024-08-12T07:35:30.402Z",
    user: {
      id: "3",
      name: "naruto",
      avatar: "",
    },
    priority: Priority.Medium,
  },
  {
    id: "1723491842465",
    name: "Task 3",
    type: TaskTypes.ToDo,
    description: "this is task3 ",
    date: "2024-08-12T07:35:30.402Z",
    user: {
      id: "4",
      name: "naruto",
      avatar: "",
    },
    priority: Priority.Medium,
  },
];

export const InProgressList: TaskConfigs[] = [
  {
    id: "1742491849465",
    name: "Task 1",
    type: TaskTypes.InProgress,
    description: "define the architecture",
    date: "2024-08-12T07:35:30.402Z",
    user: {
      id: "1",
      name: "Ishara Nilnuwan",
      avatar: "",
    },
    priority: Priority.Low,
  },
  {
    id: "1222491849465",
    name: "Task 2",
    type: TaskTypes.InProgress,
    description: "this is task 2",
    date: "2024-08-12T07:35:30.402Z",
    user: {
      id: "2",
      name: "kamel thabeth junior",
      avatar: "",
    },
    priority: Priority.High,
  },
  {
    id: "1721191849465",
    name: "Task 3",
    type: TaskTypes.InProgress,
    description: "this is task3 ",
    date: "2024-08-12T07:35:30.402Z",
    user: {
      id: "3",
      name: "naruto junior",
      avatar: "",
    },
    priority: Priority.Medium,
  },
];

export const CompleteList: TaskConfigs[] = [
  {
    id: "172342291849465",
    name: "Task 1",
    type: TaskTypes.Complete,
    description: "define the architecture",
    date: "2024-08-12T07:35:30.402Z",
    user: {
      id: "1",
      name: "Ishara Nilnuwan",
      avatar: "",
    },
    priority: Priority.Low,
  },
  //   {
  //     id: "172223491849465",
  //     name: "Task 2",
  //     type: TaskTypes.Complete,
  //     description: "this is task 2",
  //     date: "2024-08-12T07:35:30.402Z",
  //     user: {
  // id:"2",
  //       name: "kamel thabeth junior",
  //       avatar: "",
  //     },
  //     priority: Priority.High,
  //   },
  //   {
  //     id: "1723491849465222",
  //     name: "Task 3",
  //     type: TaskTypes.Complete,
  //     description: "this is task3 ",
  //     date: "2024-08-12T07:35:30.402Z",
  //     user: {
  // id:"3",
  //       name: "naruto junior",
  //       avatar: "",
  //     },
  //     priority: Priority.Medium,
  //   },
];

export const TaskColumns: TaskColumnsProps = {
  [TaskTypes.ToDo]: {
    title: TaskTypes.ToDo,
    items: TodoList,
  },
  [TaskTypes.InProgress]: {
    title: TaskTypes.InProgress,
    items: InProgressList,
  },
  [TaskTypes.Complete]: {
    title: TaskTypes.Complete,
    items: CompleteList,
  },
};

export const priorityStyles: Record<Priority, contentStyleProps> = {
    [Priority.Low]: {
        backgroundColor: '#F0FFFF',
        contentColor: '#0096FF' 
    },
    [Priority.Medium]: {
        backgroundColor: '#FFFFF0',
        contentColor: '#FFC300'
    },
    [Priority.High]: {
        backgroundColor: '#f9f3f5', // Light red
        contentColor: '#FF0000' // Red
    }
};

export const dueDateStyles: Record<DeadLineStatus, contentStyleProps> = {
    [DeadLineStatus.Overdue]: {
        backgroundColor: '#f9f3f5',
        contentColor: '#FF0000' 
    },
    [DeadLineStatus.NotDue]: {
        backgroundColor: '#F0FFFF',
        contentColor: '#0096FF' 
    }
};