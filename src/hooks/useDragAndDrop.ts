import { TaskColumns } from '@/config/tasks.config';
import { TaskLocalSorageKey, TaskTypes } from '@/constants/constants';
import { TaskColumnsProps } from '@/types/task.types';
import { Dispatch, SetStateAction } from 'react';
import { DropResult } from 'react-beautiful-dnd';
import useLocalStorage from './useLocalStorage';


const useDragAndDrop = (columns: TaskColumnsProps, setColumns: (columns: TaskColumnsProps) => void, setdragginginProgress: Dispatch<SetStateAction<boolean>>) => {

    const [value, setValue] = useLocalStorage<TaskColumnsProps>(TaskLocalSorageKey, TaskColumns);

    const onDragEnd = (result: DropResult) => {
        let newColumns
        if (!result.destination) return;
        const { source, destination } = result;

        if (source.droppableId !== destination.droppableId) {            
            const sourceColumn = columns[source.droppableId];
            const destColumn = columns[destination.droppableId];
            const sourceItems = [...sourceColumn.items];
            const destItems = [...destColumn.items];
            const [removed] = sourceItems.splice(source.index, 1);
            const updatedTask = {
                ...removed,
                type: destination.droppableId as TaskTypes,
              };
            ;
            destItems.splice(destination.index, 0, updatedTask);

             newColumns = {
                ...columns,
                [source.droppableId]: {
                    ...sourceColumn,
                    items: sourceItems,
                },
                [destination.droppableId]: {
                    ...destColumn,
                    items: destItems,
                },
            }

            setColumns(newColumns);
        } else {
            const column = columns[source.droppableId];
            const copiedItems = [...column.items];
            const [removed] = copiedItems.splice(source.index, 1);
            copiedItems.splice(destination.index, 0, removed);

            newColumns = {
                ...columns,
                [source.droppableId]: {
                    ...column,
                    items: copiedItems,
                },
            }
            setColumns(newColumns);
        }
        setValue(newColumns)

        setdragginginProgress(false);
    };

    return {
        onDragEnd,
    };
};

export default useDragAndDrop;
