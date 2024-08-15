export enum TaskTypes {
    ToDo = "ToDo",
    InProgress = "In Progress",
    Complete = "Complete"
}

export enum Priority {
    Low = "Low",
    Medium = "Medium",
    High = "High"   
}

export enum DeadLineStatus {
    NotDue = 'NotDue',
    Overdue = 'Overdue',
  }

export const TaskLocalSorageKey: string = 'task-local-storage-key';