"use client"

import { TodoList } from "@/config/tasks";
import useClickOutside from "@/hooks/useClickOutisde";
import { Add, Record } from "iconsax-react";
import { useCallback, useEffect, useState } from "react";
import { Card } from "../ui/card";

interface SubTaskMenuProp {
    type: string;
}

const SubtaskMenu: React.FC<SubTaskMenuProp> = ({ type }) => {
    const [subtaskcount, setSubTaskCount] = useState<number>(TodoList.length);
    const [taskAddingInProgress, setTaskAddingProgress] = useState<boolean>(false);
    const onClickOutisde = useCallback(() => {
        setTaskAddingProgress(false)
    }, [])
    const taskAddingRef = useClickOutside(onClickOutisde, taskAddingInProgress);



    const renderHeader = () => {
        return (
            <div className="flex flex-row items-center p-4 gap-[5px] 
                 h-[56px] left-1/2 top-4 transform 
                bg-white rounded-lg">
                <Record size="30" color="#FF8A65" />
                <h2 className="text-lg font-semibold">{type}</h2>
                {subtaskcount}
            </div>
        )
    }

    const renderAddTaskSection = () => {
        if (taskAddingInProgress) {
            //add task draft component
            return (
                
                <div ref={taskAddingRef} className="flex flex-row items-center p-4 gap-[5px] 
                 h-[56px] left-1/2 top-4 transform 
                bg-white rounded-lg">
                    
                <h2 className="text-lg font-semibold">add a task</h2>
                {subtaskcount}
            </div>
            )
        } else {
            return (
                <div onClick={() => {
                    setTaskAddingProgress(true);
                }}>
                    <Add size="32" color="#FF8A65"/> Add task
                </div>
            )
        }
    }



    return (
        <>
            {
                renderHeader()
            }
            {
                TodoList.length > 0 && TodoList.map((todoTask) => (
                    <Card key={todoTask.name}/>
                ))
            }
            {
                renderAddTaskSection()
            }
        </>
    )
}

export default SubtaskMenu;