import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { TaskConfigs } from '@/types/task.types';
import { TickCircle } from 'iconsax-react';
import { TaskTypes } from '@/constants/constants';
import { getAvater } from '../common/avatar';
import DrawerModal from '../modals/drawerModal';
import EditTaskCard from './editTaskCard';

interface ViewTaskCardProps {
    taskItem: TaskConfigs;
}

const ViewTaskCard: React.FC<ViewTaskCardProps> = ({ taskItem }) => {

    const getTickColor = () => {
        return taskItem.type === TaskTypes.Complete ? "#1F816A" : "#222222";
    }

    const renderCardElement = () => {
        return (
            <Card key={taskItem.id}
        onClick={() => {
            
        }}>
            <CardHeader className="py-4 border-b flex flex-row">
                <TickCircle size="28" color={getTickColor()} />
                <CardTitle>{taskItem.name}</CardTitle>
            </CardHeader>
            <CardContent className="py-4 border-b">
                <p>{taskItem.description}</p>
                <div className='flex flex-row'>
                {
                    getAvater(taskItem.user, 8)
                }
                {taskItem.priority}
                </div>
                
            </CardContent>
            <CardFooter className="py-3">
                <p>4 min ago</p>
            </CardFooter>
        </Card>
        )
    }
    return (
        <DrawerModal
        drawerTriggerElement={
            renderCardElement()
        }
        drawerContent={
            <EditTaskCard task={taskItem}/>
        }
        drawerHeaderTitle={<>Mark Complete</>}
        drawerHeaderDESC={<div></div>}
            />
    );
};

export default ViewTaskCard;