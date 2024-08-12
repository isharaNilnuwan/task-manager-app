import { Priority, TaskTypes } from "@/constants/constants";
import { TaskConfigs } from "@/types/task.types";

export const TodoList: TaskConfigs[] = [
    {
      name: "Task 1",
      type: TaskTypes.ToDo,
      description: "",
      date: "2024-08-12T07:35:30.402Z",
      user: {
        name: "Ishara Nilnuwan",
        avatar: ""
      },
      priority: Priority.Low,
    },
    {
        name: "Task 2",
        type: TaskTypes.ToDo,
        description: "this is task 2",
        date: "2024-08-12T07:35:30.402Z",
        user: {
          name: "kamel thabeth",
          avatar: ""
        },
        priority: Priority.High,
      },
      {
        name: "Task 3",
        type: TaskTypes.ToDo,
        description: "this is task3 ",
        date: "2024-08-12T07:35:30.402Z",
        user: {
          name: "naruto",
          avatar: ""
        },
        priority: Priority.Medium,
      },
    
  ];


export const InProgressList: TaskConfigs[] = [
    {
      name: "Task 1",
      type: TaskTypes.InProgress,
      description: "define the architecture",
      date: "2024-08-12T07:35:30.402Z",
      user: {
        name: "Ishara Nilnuwan",
        avatar: ""
      },
      priority: Priority.Low,
    },
    {
        name: "Task 2",
        type: TaskTypes.InProgress,
        description: "this is task 2",
        date: "2024-08-12T07:35:30.402Z",
        user: {
          name: "kamel thabeth junior",
          avatar: ""
        },
        priority: Priority.High,
      },
      {
        name: "Task 3",
        type: TaskTypes.InProgress,
        description: "this is task3 ",
        date: "2024-08-12T07:35:30.402Z",
        user: {
          name: "naruto junior",
          avatar: ""
        },
        priority: Priority.Medium,
      },
    
  ];

  export const CompleteList: TaskConfigs[] = [
    {
      name: "Task 1",
      type: TaskTypes.Complete,
      description: "define the architecture",
      date: "2024-08-12T07:35:30.402Z",
      user: {
        name: "Ishara Nilnuwan",
        avatar: ""
      },
      priority: Priority.Low,
    },
    {
        name: "Task 2",
        type: TaskTypes.Complete,
        description: "this is task 2",
        date: "2024-08-12T07:35:30.402Z",
        user: {
          name: "kamel thabeth junior",
          avatar: ""
        },
        priority: Priority.High,
      },
      {
        name: "Task 3",
        type: TaskTypes.Complete,
        description: "this is task3 ",
        date: "2024-08-12T07:35:30.402Z",
        user: {
          name: "naruto junior",
          avatar: ""
        },
        priority: Priority.Medium,
      },
    
  ];