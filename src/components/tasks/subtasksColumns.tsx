"use client"

import { TodoList } from "@/config/tasks";
import useClickOutside from "@/hooks/useClickOutisde";
import { Add, Record } from "iconsax-react";
import { useCallback, useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { TaskConfigs } from "@/types/task.types";
import { Draggable } from "@hello-pangea/dnd";

interface SubtaskColumnsProp {
    type: string;
    taskList: TaskConfigs[];
    draggingInProgress: boolean
}

const SubtaskColumns: React.FC<SubtaskColumnsProp> = ({ type, taskList, draggingInProgress }) => {
    const [subtaskcount, setSubTaskCount] = useState<number>(TodoList.length);
    const [taskAddingInProgress, setTaskAddingProgress] = useState<boolean>(false);
    const onClickOutisde = useCallback(() => {
        setTaskAddingProgress(false);
        //save task details to the list object if all fields are filled and save to local storage
    }, [])
    const taskAddingRef = useClickOutside(onClickOutisde, taskAddingInProgress);



    const renderHeader = () => {
        return (
            <Card className="mt-4">
                <CardHeader className="flex flex-row p-4 ">
                    <CardTitle className="flex flex-row ">
                        <Record size="30" color="#FF8A65" />
                        {type}
                    </CardTitle>
                    {subtaskcount}
                </CardHeader>
            </Card>

        )
    }

    const renderAddTaskSection = () => {
        if (draggingInProgress) return;
        if (taskAddingInProgress) {
            //add task draft component
            return (
                <Card ref={taskAddingRef} className="mt-4">
                    <CardHeader className="flex flex-row p-4 ">
                        <CardTitle className="flex flex-row ">
                            add a task
                        </CardTitle>
                        {subtaskcount}
                    </CardHeader>
                </Card>
            )
        } else {
            return (
                <div className="mt-4" onClick={() => {
                    setTaskAddingProgress(true);
                }}>
                    <Add size="32" color="#FF8A65" /> Add task
                </div>
            )
        }
    }

    const renderTaskList = () => {
        return (
            taskList.length > 0 && taskList.map((taskItem, index) => (
                <Draggable key={taskItem.id} draggableId={taskItem.id} index={index}>
                    {(provided) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                        >
                            <div className="pt-4">
                                <Card key={taskItem.id}>
                                    <CardHeader className="py-4  border-b ">
                                        <CardTitle className="">Card Title</CardTitle>
                                    </CardHeader>
                                    <CardContent className="py-4 border-b">
                                        <p>{taskItem.description}</p>
                                    </CardContent>
                                    <CardFooter className="py-3">
                                        <p>4 min ago</p>
                                    </CardFooter>
                                </Card>
                            </div>
                        </div>
                    )}
                </Draggable>


            ))
        )
    }



    return (
        <>
            {
                renderHeader()
            }
            {
                renderTaskList()
            }
            {
                renderAddTaskSection()
            }
        </>
    )
}

export default SubtaskColumns;
