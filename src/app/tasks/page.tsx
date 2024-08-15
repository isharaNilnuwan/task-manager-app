"use client"

import SubtaskColumns from "@/components/tasks/subtasksColumns"
import { CompleteList, InProgressList, TaskColumns, TodoList } from "@/config/tasks.config"
import { TaskLocalSorageKey, TaskTypes } from "@/constants/constants"
import { TaskColumn, TaskColumnsProps } from "@/types/task.types";
import { useEffect, useState } from "react";
import { DragDropContext, DropResult, Droppable } from '@hello-pangea/dnd';
import useDragAndDrop from "@/hooks/useDragAndDrop";
import { RootState } from "../GlobalRedux/store";
import { useSelector, useDispatch } from 'react-redux';
import { updateTaskColumns } from "../GlobalRedux/Features/taskColumn/taskColumnSlice";
import useLocalStorage from "@/hooks/useLocalStorage";

const selectTaskColumns = (state: RootState) => state.taskColumns;

const Dashboard = () => {
    const dispatch = useDispatch();    
    const taskColumns = useSelector(selectTaskColumns);
    const [draggingInProgress, setdragginginProgress] = useState<boolean>(false);
    const [value, setValue] = useLocalStorage<TaskColumnsProps>(TaskLocalSorageKey, TaskColumns);

    useEffect(() => {
        const fetchColumnData = () => {
            updateColumns(value)            
        };

        fetchColumnData();
    },[])

    const updateColumns = (newTaskColumns: TaskColumnsProps) => {
        dispatch(updateTaskColumns(newTaskColumns))
    }

    const { onDragEnd } = useDragAndDrop(taskColumns, updateColumns, setdragginginProgress);

    return (
        <DragDropContext
            onDragEnd={onDragEnd}
            onBeforeDragStart={() => {
                setdragginginProgress(true)
            }}
        >
            <div className="flex  p-4 h-full">
                {
                    Object.entries(taskColumns).map(([columnId, column], index) => {
                        return (
                            <Droppable key={columnId} droppableId={columnId}>
                                {(droppableProvided, snapshot) => (
                                    <div className="flex-1 min-w-[200px] border-dashed border-2 border-gray-300 rounded-lg p-4 mx-2 flex flex-col"
                                        ref={droppableProvided.innerRef}
                                        {...droppableProvided.droppableProps}
                                    >
                                        <div className="flex-1 ">
                                            <SubtaskColumns
                                                type={column.title}
                                                taskList={column.items}
                                                draggingInProgress={draggingInProgress} />
                                        </div>
                                        {droppableProvided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        );
                    })
                }
            </div>
        </DragDropContext>
    )
}

export default Dashboard
