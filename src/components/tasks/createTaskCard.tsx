"use client"

import { Priority } from "@/constants/constants";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import React, { Ref, forwardRef, useMemo, useState } from 'react';
import { CalendarCircle, ProfileCircle, TickCircle } from "iconsax-react";
import { Input } from "../ui/input";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Button } from "../ui/button";
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { User } from "@/types/task.types";
import { users } from "@/config/users";
import { getAvater } from "../common/avatar";
import CustomDropdownMenu from "../common/customDropdown";
import CustomCalendar from "../common/customCalander";

interface CreateTaskCardProps {
    type?: string;
    ignoreOutsideClick: (ignore: boolean) => void
}


const CreateTaskCard = forwardRef<HTMLDivElement, CreateTaskCardProps>(
    ({ type, ignoreOutsideClick }, ref: Ref<HTMLDivElement>) => {

        const [date, setDate] = React.useState<Date>();
        const [popoverOpen, setCalanderOpen] = useState<boolean>(false);
        const [selectedUser, setSelectedUser] = useState<User>();
        const [selectedPriority, setselectedPriority] = useState<Priority>();

        const priorityTriggerElem = useMemo(() => {
            return selectedPriority ? (
                <Button>{selectedPriority}</Button>
            ) : (
                <Button>Set Priority</Button>
            );
        }, [selectedPriority]);

        const userSelectTriggerElem = useMemo(() => {
            return selectedUser ? (
                getAvater(selectedUser)
            ) : (
                <ProfileCircle size="32" color="#FF8A65" />
            );
        }, [selectedUser]);

        const calendarSelectTriggerElem = useMemo(() => {
            return date ? (
                <>{date.toDateString()}</>
            ) : (
                <CalendarCircle size="32" color="#FF8A65" />
            );
        }, [date]);


        const handleDropdownOpenChange = (open: boolean) => {
            setTimeout(() => {
                ignoreOutsideClick(open);
            }, 0);
        };

        const handleCalanderOpenChange = (open: boolean) => {
            setCalanderOpen(open)
            setTimeout(() => {
                ignoreOutsideClick(open);
            }, 0);
        }

        const handleDateSelect: (date: Date | undefined) => void = (selectedDate) => {
            setDate(selectedDate);
            setCalanderOpen(false);
            ignoreOutsideClick(false);
            console.log("#$ selected date", selectedDate);
        };

        const handlePrioritySelect = (priority: Priority) => {
            ignoreOutsideClick(false);
            setselectedPriority(priority);
        }

        const handleUserSelect = (user: User) => {
            ignoreOutsideClick(false);
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
            <Card ref={ref} className="mt-4">
                <CardHeader className="py-4  border-b">
                    <div className="flex flex-row gap-4">
                        <TickCircle size="32" color="#FF8A65" />
                        <Input id="name" placeholder="Write a task name" />
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
    }
);

export default CreateTaskCard;
