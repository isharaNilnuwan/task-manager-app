import { DeadLineStatus, Priority, TaskTypes } from "@/constants/constants";
import { TaskConfigs, User } from "@/types/task.types";
import moment from "moment";

export function getFirstAndLastInitials(str: string) {
  str = str.trim();
  const words = str.split(/\s+/);

  if (words.length === 0) return "";
  const firstWord = words[0];
  const lastWord = words[words.length - 1];

  const firstInitial = firstWord.charAt(0).toUpperCase();
  const lastInitial = lastWord.charAt(0).toUpperCase();

  return `${firstInitial}${lastInitial}`;
}

export function formatDate(date: Date, format: string) {
  return moment(date).format(format);
}

export function get_M_D_Format(date: string) {
  const formattedObj = new Date(date);
  return formatDate(formattedObj, "MMM DD");
}

export function get_D_M_Y_Format(date: string) {
  const formattedObj = new Date(date);
  return formatDate(formattedObj, "DD MMMM YYYY");
}

export function getDueDateStatus(dueDate: string) {
  return getDayDiff(dueDate) >= 0
    ? DeadLineStatus.NotDue
    : DeadLineStatus.Overdue;
}

function getDayDiff(dueDate: string) {
  const formattedObj = new Date(dueDate);
  const now = moment();
  const due = moment(formattedObj);

  return due.diff(now, "days");
}

export function getRemainingTimeText(dueDate: string) {
  const daysDifference = getDayDiff(dueDate);

  if (daysDifference > 1) {
    return `Should complete within ${daysDifference} days`;
  } else if (daysDifference === 1) {
    return "Should complete within tomorrow";
  } else if (daysDifference === 0) {
    return "Should complete within today";
  } else if (daysDifference === -1) {
    return "Should’ve completed yesterday";
  } else {
    return `Should’ve completed ${Math.abs(daysDifference)} days ago`;
  }
}

export const getStatusCircleColors = (type: TaskTypes) => {
  if (type === TaskTypes.ToDo) {
    return "#FF8A65";
  }
  if (type === TaskTypes.InProgress) {
    return "#1f83d0 ";
  }
  if (type === TaskTypes.Complete) {
    return "#1F816A";
  }
};

export const getTaskObject = (
  taskTitle: string,
  type: TaskTypes,
  description: string,
  date: Date,
  selectedUser: User,
  selectedPriority: Priority,
  id?: string
) => {
  const Task: TaskConfigs = {
    id: id || Date.now().toString(),
    name: taskTitle,
    type: type,
    description: description,
    date: date.toISOString(),
    user: selectedUser,
    priority: selectedPriority,
  };
  return Task;
};
