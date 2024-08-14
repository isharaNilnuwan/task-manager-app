"use client"

import { Add, Record } from "iconsax-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { TaskConfigs } from "@/types/task.types";
import { Draggable } from "@hello-pangea/dnd";
import CreateTaskCard from "./createTaskCard";
import { TaskTypes } from "@/constants/constants";
import ViewTaskCard from "./viewTaskCard";

interface SubtaskColumnsProp {
    type: TaskTypes;
    taskList: TaskConfigs[];
    draggingInProgress: boolean
}

const SubtaskColumns: React.FC<SubtaskColumnsProp> = ({ type, taskList, draggingInProgress }) => {

    const [taskAddingInProgress, setTaskAddingProgress] = useState<boolean>(false);

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
                <CreateTaskCard
                    type={type}
                    taskAddingInProgress={taskAddingInProgress} 
                    setTaskAddingProgress={setTaskAddingProgress}/>
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
                                <ViewTaskCard taskItem={taskItem}/>
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
function useSelector(selectTaskColumns: any) {
    throw new Error("Function not implemented.");
}

