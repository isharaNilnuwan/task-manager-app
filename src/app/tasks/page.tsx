"use client"

import SubtaskColumns from "@/components/tasks/subtasksColumns"
import { CompleteList, InProgressList, TaskColumns, TodoList } from "@/config/tasks"
import { TaskTypes } from "@/constants/constants"
import { TaskColumn, TaskColumnsProps } from "@/types/task.types";
import { useState } from "react";
import { DragDropContext, DropResult, Droppable } from '@hello-pangea/dnd';
import useDragAndDrop from "@/hooks/useDragAndDrop";
import { RootState } from "../GlobalRedux/store";
import { useSelector, useDispatch } from 'react-redux';
import { updateTaskColumns } from "../GlobalRedux/Features/taskColumn/taskColumnSlice";

const selectTaskColumns = (state: RootState) => state.taskColumns;

const Dashboard = () => {
    const dispatch = useDispatch();    
    const taskColumns = useSelector(selectTaskColumns);
    const [columns, setColumns] = useState<TaskColumnsProps>(taskColumns);
    const [draggingInProgress, setdragginginProgress] = useState<boolean>(false);

    const updateColumns = (newTaskColumns: TaskColumnsProps) => {
        dispatch(updateTaskColumns(newTaskColumns))
    }

    const { onDragEnd } = useDragAndDrop(taskColumns, updateColumns, setdragginginProgress);

    console.log("#$ task column props", taskColumns)

    return (
        <DragDropContext
            onDragEnd={onDragEnd}
            onBeforeDragStart={() => {
                setdragginginProgress(true)
            }}
        >
            <div className="flex  p-4">
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
