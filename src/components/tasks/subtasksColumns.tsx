"use client"

import { Add, Record } from "iconsax-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { TaskConfigs } from "@/types/task.types";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import CreateTaskCard from "./createTaskCard";
import { TaskTypes } from "@/constants/constants";
import ViewTaskCard from "./viewTaskCard";

interface SubtaskColumnsProp {
    type: TaskTypes;
    taskList: TaskConfigs[];
    draggingInProgress: boolean;
}

const SubtaskColumns: React.FC<SubtaskColumnsProp> = ({ type, taskList, draggingInProgress }) => {

    const [taskAddingInProgress, setTaskAddingProgress] = useState<boolean>(false);

    const getCircleColors = (type: TaskTypes) => {
        if (type === TaskTypes.ToDo ) {return '#FF8A65'};
        if (type === TaskTypes.InProgress ) {return '#1f83d0 '};
        if (type === TaskTypes.Complete ) {return '#1F816A'};
    }

    //render methods
    const renderHeader = () => {
        return (
            <Card className="mt-4">
                <CardHeader className="flex flex-row p-4 items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <Record size="30" color={getCircleColors(type)} />
                        <CardTitle className="flex flex-row items-center space-x-4">
                            <span className="text-xl">{type}</span>
                            <div className="flex items-center justify-center text-sm w-4 h-4 bg-blue-200 text-blue-800 rounded-full">
                                {taskList.length}
                            </div>
                        </CardTitle>
                    </div>
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
                    setTaskAddingProgress={setTaskAddingProgress} />
            )
        } else {
            return (
                <div className="flex justify-center items-center my-4">
                    <div
                        className="flex items-center space-x-2 cursor-pointer"
                        onClick={() => setTaskAddingProgress(true)}
                    >
                        <Add size="32" color="#9f9f9f" />
                        <span>Add Task</span>
                    </div>
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
                                <ViewTaskCard taskItem={taskItem} />
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

