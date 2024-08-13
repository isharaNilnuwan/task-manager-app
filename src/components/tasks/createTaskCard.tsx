"use client"

import { Priority, TaskTypes } from "@/constants/constants";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import React, { use, useCallback, useMemo, useState } from 'react';
import { CalendarCircle, ProfileCircle, TickCircle } from "iconsax-react";
import { Input } from "../ui/input";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Button } from "../ui/button";
import { TaskConfigs, User } from "@/types/task.types";
import { users } from "@/config/users";
import { getAvater } from "../common/avatar";
import CustomDropdownMenu from "../common/customDropdown";
import CustomCalendar from "../common/customCalander";
import useClickOutside from "@/hooks/useClickOutisde";

interface CreateTaskCardProps {
    type: TaskTypes;
    taskAddingInProgress: boolean;
    setTaskAddingProgress: (taskAddingInProgress: boolean) => void
}

import type { RootState } from '../../app/GlobalRedux/store'
import { useSelector, useDispatch } from 'react-redux';
import { addTaskToColumn, updateTaskColumns } from "@/app/GlobalRedux/Features/taskColumn/taskColumnSlice";
import { TodoList } from "@/config/tasks";

const selectTaskColumns = (state: RootState) => state.taskColumns;

const CreateTaskCard: React.FC<CreateTaskCardProps> = ({ type, taskAddingInProgress, setTaskAddingProgress }) => {

    const taskColumns = useSelector(selectTaskColumns);
    console.log("#$ columns", taskColumns);

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
        

        //save task details to the list object if all fields are filled and save to local storage
    }, [selectedPriority, selectedUser, date, taskTitle])

    const taskAddingRef = useClickOutside(onClickOutisde, taskAddingInProgress, ignoreClick);


    const priorityTriggerElem = useMemo(() => {
        return selectedPriority ? (
            <Button>{selectedPriority}</Button>
        ) : (
            <Button>Set Priority</Button>
        );
    }, [selectedPriority]);

    const userSelectTriggerElem = useMemo(() => {
        return selectedUser ? (
            <div>
                {getAvater(selectedUser)}
                {selectedUser.name}
            </div>

        ) : (
            <ProfileCircle size="32" color="#FF8A65" />
        );
    }, [selectedUser]);

    const calendarSelectTriggerElem = useMemo(() => {
        return date ? (
            <div>{date.toDateString()}</div>
        ) : (
            <CalendarCircle size="32" color="#FF8A65" />
        );
    }, [date]);

    const addTaskToList = () => {
        if (selectedPriority && taskTitle && selectedUser && date) {
            const Task: TaskConfigs = {
                id: Date.now().toString(),
                name: taskTitle,
                type: type,
                description: "",
                date: date.toString(),
                user: selectedUser,
                priority: selectedPriority
            }
    
            dispatch(addTaskToColumn({ type: type, task: Task}));
        }

    }

    const handleDropdownOpenChange = (open: boolean) => {
        setIgnoreClick(open);
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



    const renderPrioritySelection = () => {
        return (
            <CustomDropdownMenu
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
                onOpenChange={handleDropdownOpenChange}
                dropdownTriggerElement={userSelectTriggerElem}
                render={() => (
                    <>
                        {
                            users.map((user) => (
                                <DropdownMenuItem key={user.id}
                                    onSelect={() => handleUserSelect(user)}
                                    aria-selected={selectedUser === user}
                                >
                                    {
                                        getAvater(user)
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
                date={date}
                handleDateSelect={handleDateSelect}
            />
        )
    }


    return (
        <Card ref={taskAddingRef} className="mt-4">
            <CardHeader className="py-4  border-b">
                <div className="flex flex-row gap-1">
                    <TickCircle size="32" color="#FF8A65" />
                    <Input className="border-none focus-visible:ring-0 focus-visible:ring-offset-0"
                        id="title"
                        placeholder="Write a task name"
                        value={taskTitle}
                        onChange={(e) => {
                            setTaskTitle(e.target.value)
                        }}
                    />
                </div>
            </CardHeader>
            <CardContent className="py-4 border-b">
                {
                    renderProfilePicture()
                }
                {
                    renderCalander()
                }
                {
                    renderPrioritySelection()
                }
            </CardContent>
        </Card>
    );
};

export default CreateTaskCard;
