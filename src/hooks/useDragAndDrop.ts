import { TaskColumns } from '@/config/tasks';
import { TaskTypes } from '@/constants/constants';
import { TaskColumnsProps } from '@/types/task.types';
import { Dispatch, SetStateAction } from 'react';
import { DropResult } from 'react-beautiful-dnd';


const useDragAndDrop = (columns: TaskColumnsProps, setColumns: Dispatch<SetStateAction<TaskColumnsProps>>, setdragginginProgress: Dispatch<SetStateAction<boolean>>) => {
    const onDragEnd = (result: DropResult) => {
        if (!result.destination) return;
        const { source, destination } = result;

        if (source.droppableId !== destination.droppableId) {
            console.log("#$ change columns")
            const sourceColumn = columns[source.droppableId];
            const destColumn = columns[destination.droppableId];
            const sourceItems = [...sourceColumn.items];
            const destItems = [...destColumn.items];
            const [removed] = sourceItems.splice(source.index, 1);
            removed.type = destination.droppableId as TaskTypes;
            ;
            destItems.splice(destination.index, 0, removed);

            setColumns({
                ...columns,
                [source.droppableId]: {
                    ...sourceColumn,
                    items: sourceItems,
                },
                [destination.droppableId]: {
                    ...destColumn,
                    items: destItems,
                },
            });
        } else {
            const column = columns[source.droppableId];
            const copiedItems = [...column.items];
            const [removed] = copiedItems.splice(source.index, 1);
            copiedItems.splice(destination.index, 0, removed);

            setColumns({
                ...columns,
                [source.droppableId]: {
                    ...column,
                    items: copiedItems,
                },
            });
        }
        //save the data as well thouth a hook
        setdragginginProgress(false);
    };

    return {
        onDragEnd,
    };
};

export default useDragAndDrop;
