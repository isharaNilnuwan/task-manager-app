"use client"

import SubtaskColumns from "@/components/tasks/subtasksColumns"
import { CompleteList, InProgressList, TaskColumns, TodoList } from "@/config/tasks"
import { TaskTypes } from "@/constants/constants"
import { TaskColumn, TaskColumnsProps } from "@/types/task.types";
import { useState } from "react";
import { DragDropContext, DropResult, Droppable } from '@hello-pangea/dnd';
import useDragAndDrop from "@/hooks/useDragAndDrop";

const Dashboard = () => {

    const [columns, setColumns] = useState<TaskColumnsProps>(TaskColumns);
    const [draggingInProgress, setdragginginProgress] = useState<boolean>(false);

    const { onDragEnd } = useDragAndDrop(columns, setColumns, setdragginginProgress);

    // const onDragEnd = (result: DropResult, columns: TaskColumnsProps, setColumns: React.Dispatch<React.SetStateAction<TaskColumnsProps>>) => {
    //     if (!result.destination) return;
    //     const { source, destination } = result;
    //     if (source.droppableId !== destination.droppableId) {
    //         const sourceColumn = columns[source.droppableId];
    //         const destColumn = columns[destination.droppableId];
    //         const sourceItems = [...sourceColumn.items];
    //         const destItems = [...destColumn.items];
    //         const [removed] = sourceItems.splice(source.index, 1);
    //         destItems.splice(destination.index, 0, removed);
    //         setColumns({
    //             ...columns,
    //             [source.droppableId]: {
    //                 ...sourceColumn,
    //                 items: sourceItems,
    //             },
    //             [destination.droppableId]: {
    //                 ...destColumn,
    //                 items: destItems,
    //             },
    //         });
    //     } else {
    //         const column = columns[source.droppableId];
    //         const copiedItems = [...column.items];
    //         const [removed] = copiedItems.splice(source.index, 1);
    //         copiedItems.splice(destination.index, 0, removed);
    //         setColumns({
    //             ...columns,
    //             [source.droppableId]: {
    //                 ...column,
    //                 items: copiedItems,
    //             },
    //         });            
    //     }
    //     setdragginginProgress(false);
    // }
    return (
        <DragDropContext
            onDragEnd={onDragEnd}
            onBeforeDragStart={() => {
                setdragginginProgress(true)
            }}
        >
            <div className="flex  p-4">
                {
                    Object.entries(columns).map(([columnId, column], index) => {
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