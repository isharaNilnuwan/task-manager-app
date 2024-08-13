"use client"

import { TodoList } from "@/config/tasks";
import useClickOutside from "@/hooks/useClickOutisde";
import { Add, Record } from "iconsax-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { TaskConfigs } from "@/types/task.types";
import { Draggable } from "@hello-pangea/dnd";
import CreateTaskCard from "./createTaskCard";

interface SubtaskColumnsProp {
    type: string;
    taskList: TaskConfigs[];
    draggingInProgress: boolean
}

const SubtaskColumns: React.FC<SubtaskColumnsProp> = ({ type, taskList, draggingInProgress }) => {

    const [taskAddingInProgress, setTaskAddingProgress] = useState<boolean>(false);
    const ignoreClick = useRef<boolean>(false)
    
    const onClickOutisde = useCallback(() => {        
        if(ignoreClick.current) return;
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
                    {taskList.length}
                </CardHeader>
            </Card>

        )
    }

    const renderAddTaskSection = () => {
        if (draggingInProgress) return;
        if (taskAddingInProgress) {
            return (
                <CreateTaskCard ref={taskAddingRef} ignoreOutsideClick={(open) => {
                    ignoreClick.current = open;
                }}/>
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
                                        {taskItem.type}
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
