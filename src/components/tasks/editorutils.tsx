import React from 'react';
import { date_M_D_FormatWrapper, priorityTaskWrapper } from '../common/wrappers';
import { User as UserAvatar, CalendarCircle, CloseCircle, Flag, Record, ProfileCircle, TickCircle, Trash, ArrowRight } from 'iconsax-react';
import { Priority, TaskTypes } from '@/constants/constants';
import { User } from '@/types/task.types';
import { avatarWithName } from '../common/avatar';
import { getStatusCircleColors } from '@/utils/appUtils';

export const renderSelectedDate = (dueDate: string, setDueDate: React.Dispatch<React.SetStateAction<string>>) => {
    return (
        <div className='flex flex-row align-center items-center gap-3 space-x-2'>
            {date_M_D_FormatWrapper(dueDate)}
            <CloseCircle onClick={(event) => {
                event.preventDefault();
                setDueDate(null);
            }} size="22" color="#9f9f9f" />
        </div>
    );
};

export const renderDefaultDateSelectView = (nuetrelAvatarColor: string, avatrSize: number) => {
    return (
        <div className='flex flex-row align-center items-center  space-x-3 bg-gray-100 text-sm rounded-lg px-2 py-1'>
            <><CalendarCircle size={avatrSize} color={nuetrelAvatarColor} /> <div className='text-gray-600'>No Due Date</div></>
        </div>
    );
};

export const renderSelectedPriority = (selectedPriority: Priority, setselectedPriority: React.Dispatch<React.SetStateAction<Priority>>) => {
    return (
        <div className='flex flex-row align-center items-center gap-3 space-x-2'>
            {priorityTaskWrapper(selectedPriority)}
            <CloseCircle onClick={(event) => {
                event.preventDefault();
                setselectedPriority(null);
            }} size="22" color="#9f9f9f" />
        </div>
    );
};

export const renderSelectedUser = (selectedUser: User, setSelectedUser: React.Dispatch<React.SetStateAction<User>>) => {
    return (
        <div className='flex flex-row align-center items-center gap-3 space-x-2'>
            {avatarWithName(selectedUser, 7)}
            <CloseCircle onClick={(event) => {
                event.preventDefault();
                setSelectedUser(null);
            }} size="22" color="#9f9f9f" />
        </div>
    );
};

export const renderDefaultUserSelectView = (nuetrelAvatarColor: string, avatrSize: number) => {
    return (
        <div className='flex flex-row align-center items-center  space-x-3 bg-gray-100 text-sm rounded-lg px-2 py-1'>
            <><ProfileCircle size={avatrSize} color={nuetrelAvatarColor} /><div className='text-gray-600'>No Assignee</div></>
        </div>
    );
};


//label rendering of the drawer details section

export const renderCalanderlabel = (color: string, avatrSize: number) => {
    return (
        <div className='flex flex-row align-center items-center gap-3' > <CalendarCircle size={avatrSize} color={color} /> Due Date</div>
    )
}

export const renderAvatarLabel = (color: string, avatrSize: number) => {
    return (
        <div className='flex flex-row align-center items-center gap-3'><UserAvatar size={avatrSize} color={color} />Assignee:</div>
    )
}

export const renderPriorityLabel = (color: string, avatrSize: number) => {
    return (
        <div className='flex flex-row align-center items-center gap-3'><Flag size={avatrSize} color={color} />Priority</div>
    )
}

export const rendertaskStatusLabel = (color: string, avatrSize: number) => {
    return (
        <div className='flex flex-row align-center items-center gap-3'><Record size={avatrSize} color={color} /> Status</div>
    )
}

export const renderTaskStatusView = (type: TaskTypes, avatrSize: number) => {
    return (
        <div className="flex items-center space-x-2">
            <Record size={avatrSize} color={getStatusCircleColors(type)} />
            <span className="text-m text-gray-600">{type}</span>
        </div>
    )
}

export const renderTopBar = (avatrSize: number, color: string, setTaskStatus: React.Dispatch<React.SetStateAction<TaskTypes>>, setDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>, onDeleteTask: ()=> void) => {
    return (
        <div className="flex flex-row items-center justify-between mb-4">
            <div className="flex items-center space-x-2 rounded-lg border">
                <TickCircle onClick={() => {
                    setTaskStatus(TaskTypes.Complete);
                }} size="26" color="#222222" />
                <p className="text-sm" style={{ fontSize: '0.815rem' }}>Mark Complete</p>
            </div>
            <div className="flex items-center space-x-2">
                <Trash onClick={() => {
                    onDeleteTask();
                }} size={avatrSize} color={color} />
                <ArrowRight onClick={() => {
                    setDrawerOpen(false);
                }} size={avatrSize} color={color} />
            </div>
        </div>
    )
}