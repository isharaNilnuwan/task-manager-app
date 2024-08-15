import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { TaskConfigs } from '@/types/task.types';
import { TickCircle } from 'iconsax-react';
import { TaskTypes } from '@/constants/constants';
import { getAvater } from '../common/avatar';
import EditTaskCard from './editTaskCard';
import { date_M_D_FormatWrapper, dueDateTextWrapper, priorityTaskWrapper } from '../common/wrappers';
import DrawerModal from '../modals/rightSideBardrawer';

interface ViewTaskCardProps {
    taskItem: TaskConfigs;
}

const ViewTaskCard: React.FC<ViewTaskCardProps> = ({ taskItem }) => {

    const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

    const getTickColor = () => {
        return taskItem.type === TaskTypes.Complete ? "#1F816A" : "#222222";
    }

    const renderCardElement = () => {
        return (
            <Card key={taskItem.id}
                onClick={() => {

                }}>
                <CardHeader className="py-4 border-b flex flex-row items-center space-x-2 space-y-0">
                    <TickCircle size="26" color={getTickColor()} />
                    <CardTitle className="text-gray-800 text-2xl">
                        {taskItem.name}
                    </CardTitle>
                </CardHeader>
                <CardContent className="py-2 border-b">
                    {taskItem.description.length > 0 && (
                        <p className='line-clamp-2 text-gray-700'>
                            {taskItem.description}
                        </p>
                    )}
                    <div className='flex flex-row justify-between items-center'>
                        <div className='flex flex-row items-center gap-4'>
                            {getAvater(taskItem.user, 10)}
                            {date_M_D_FormatWrapper(taskItem.date)}
                        </div>
                        {priorityTaskWrapper(taskItem.priority)}
                    </div>

                </CardContent>
                <CardFooter className="py-3">
                    {taskItem.type !== TaskTypes.Complete && (
                        <>{dueDateTextWrapper(taskItem.date)}</>
                    )}
                    

                </CardFooter>
            </Card>
        )


    }
    return (
        <>
        
        <DrawerModal
            open={drawerOpen}
            setOpen={setDrawerOpen}
            drawerTriggerElement={
                renderCardElement()
            }
            drawerContent={
                <EditTaskCard task={taskItem} setDrawerOpen={setDrawerOpen} drawerOpen={drawerOpen}/>
            }               
        />
    </>
        

    );
};

export default ViewTaskCard;