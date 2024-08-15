"use client"

import { Priority, TaskTypes } from "@/constants/constants";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import React, { use, useCallback, useMemo, useState } from 'react';
import { CalendarCircle, ProfileCircle, TickCircle } from "iconsax-react";
import { Input } from "../ui/input";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Button } from "../ui/button";
import { TaskConfigs, User } from "@/types/task.types";
import { users } from "@/config/users.config";
import { avatarWithName, getAvater } from "../common/avatar";
import CustomDropdownMenu from "../common/customDropdown";
import CustomCalendar from "../common/customCalander";
import useClickOutside from "@/hooks/useClickOutisde";

interface CreateTaskCardProps {
    type: TaskTypes;
    taskAddingInProgress: boolean;
    setTaskAddingProgress: (taskAddingInProgress: boolean) => void
}

import { useSelector, useDispatch } from 'react-redux';
import { addTaskToColumn, updateTaskColumns } from "@/app/GlobalRedux/Features/taskColumn/taskColumnSlice";
import { date_M_D_FormatWrapper, priorityTaskWrapper } from "../common/wrappers";


const CreateTaskCard: React.FC<CreateTaskCardProps> = ({ type, taskAddingInProgress, setTaskAddingProgress }) => {

    const dispatch = useDispatch();

    const [date, setDate] = React.useState<Date>();
    const [popoverOpen, setCalanderOpen] = useState<boolean>(false);
    const [selectedUser, setSelectedUser] = useState<User>();
    const [selectedPriority, setselectedPriority] = useState<Priority>();
    const [taskTitle, setTaskTitle] = useState<string>('');
    const [ignoreClick, setIgnoreClick] = useState<boolean>(false)

    const onClickOutisde = useCallback(() => {
        setTaskAddingProgress(false);
        addTaskToList();
    }, [selectedPriority, selectedUser, date, taskTitle])

    const taskAddingRef = useClickOutside(onClickOutisde, taskAddingInProgress, ignoreClick);


    const priorityTriggerElem = useMemo(() => {
        return selectedPriority ? (
            <div>{priorityTaskWrapper(selectedPriority)}</div>
        ) : (
            <div className="flex items-center bg-gray-50 text-xs rounded-lg px-2 py-1">
                <p>Set Priority</p>
            </div>
        );
    }, [selectedPriority]);

    const userSelectTriggerElem = useMemo(() => {
        return selectedUser ? (
            <div className="h-10 w-10">
                {getAvater(selectedUser, 10)}
            </div>

        ) : (
            <ProfileCircle size="32" color="#9f9f9f" />
        );
    }, [selectedUser]);

    const calendarSelectTriggerElem = useMemo(() => {
        return date ? (
            <div>{date_M_D_FormatWrapper(date.toISOString())}</div>
        ) : (
            <CalendarCircle size="32" color="#9f9f9f" />
        );
    }, [date]);

    const addTaskToList = () => {
        console.log("#$ add to task list")
        if (selectedPriority && taskTitle && selectedUser && date) {
            const Task: TaskConfigs = {
                id: Date.now().toString(),
                name: taskTitle,
                type: type,
                description: "",
                date: date.toISOString(),
                user: selectedUser,
                priority: selectedPriority
            }

            dispatch(addTaskToColumn({ type: type, task: Task }));
        }

    }

    //event handlers
    const handleDropdownOpenChange = (open: boolean) => {
        setTimeout(() => {
            setIgnoreClick(open);
        }, 0);
    };

    const handleCalanderOpenChange = (open: boolean) => {
        setCalanderOpen(open)
        setIgnoreClick(open)
    }

    const handleDateSelect: (date: Date | undefined) => void = (selectedDate) => {
        setDate(selectedDate);
        setCalanderOpen(false);
        setIgnoreClick(false)
        console.log("#$ selected date", selectedDate);
    };

    const handlePrioritySelect = (priority: Priority) => {
        setIgnoreClick(false);
        setselectedPriority(priority);
    }

    const handleUserSelect = (user: User) => {
        setSelectedUser(user);
    }



    //render methods
    const renderPrioritySelection = () => {
        return (
            <CustomDropdownMenu
                dropDownWidth="w-50"
                onOpenChange={handleDropdownOpenChange}
                dropdownTriggerElement={priorityTriggerElem}
                render={
                    () => (
                        <>{
                            Object.values(Priority).map((priority) => (
                                <DropdownMenuItem key={priority}
                                    onSelect={() => handlePrioritySelect(priority)}
                                    aria-selected={selectedPriority === priority}
                                >
                                    {
                                        priority
                                    }
                                </DropdownMenuItem>
                            ))
                        }</>
                    )
                }
            />
        );
    }

    const renderProfilePicture = () => {
        return (
            <CustomDropdownMenu
                dropDownWidth="w-56"
                onOpenChange={handleDropdownOpenChange}
                dropdownTriggerElement={userSelectTriggerElem}
                render={() => (
                    <>
                        {
                            users.map((user) => (
                                <DropdownMenuItem key={user.id}
                                    onSelect={() => handleUserSelect(user)}
                                    aria-selected={selectedUser === user}
                                    className="gap-1"
                                >
                                    {
                                        getAvater(user, 7)
                                    }
                                    {user.name}
                                </DropdownMenuItem>
                            ))
                        }
                    </>
                )}
            />
        )
    }

    const renderCalander = () => {
        return (
            <CustomCalendar
                popoverOpen={popoverOpen}
                handleCalanderOpenChange={handleCalanderOpenChange}
                calendarSelectTriggerElem={calendarSelectTriggerElem}
                date={date || new Date()}
                handleDateSelect={handleDateSelect}
            />
        )
    }


    return (
        <Card ref={taskAddingRef} className="mt-4">
            <CardHeader className="py-4 border-b">
                <div className="flex flex-row items-center gap-2">
                    <TickCircle size="32" color="#9f9f9f" />
                    <textarea
                        className="resize-none overflow-hidden border-none focus:outline-none focus:ring-0 line-clamp-1 max-w-full"
                        id="title"
                        placeholder="Write a task name"
                        value={taskTitle}
                        onChange={(e) => {
                            setTaskTitle(e.target.value.slice(0, 100));
                        }}
                        rows={1}
                    />
                </div>
            </CardHeader>
            <CardContent className="py-4 border-b flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    {
                        renderProfilePicture()
                    }
                    {
                        renderCalander()
                    }
                </div>
                {
                    renderPrioritySelection()
                }
            </CardContent>
        </Card>
    );
};

export default CreateTaskCard;
