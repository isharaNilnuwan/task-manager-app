import { TaskConfigs, User } from '@/types/task.types';
import React, { useState } from 'react';
import { avatarWithName } from '../common/avatar';
import { getRemainingTimeText, get_D_M_Y_Format, get_M_D_Format } from '@/utils/appUtils';
  

interface EditTaskCardProps {
    task: TaskConfigs;
    // onSave: (updatedTask: TaskItem) => void;
  }

const EditTaskCard : React.FC<EditTaskCardProps>  = ({task}) => {
    const [title, setTitle] = useState(task.name);
  const [dueDate, setDueDate] = useState(task.date);
  const [assignee, setAssignee] = useState<User>(task.user);
  const [priority, setPriority] = useState(task.priority);
  const [description, setDescription] = useState('');


    return (
        <div className="max-w-lg mx-auto p-4  rounded-lg">
      {/* Title Section */}
      <div className="mb-4">
        <textarea
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded-lg"
          placeholder="Task Title"
        />
      </div>

      {/* Details Section */}
     {/* Details Section */}
     <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-4">

        <div className="flex items-center">
          <label className="block text-sm font-medium text-gray-700">Status:</label>
        </div>
        <div className="flex items-center">
          <p className="text-gray-600">{task.type}</p>
        </div>

        <div className="flex items-center">
          <label className="block text-sm font-medium text-gray-700">Due Date:</label>
        </div>
        <div className="flex items-center">
          <>{get_D_M_Y_Format(dueDate)}
          
          </>
        </div>

        <div className="flex items-center">
          <label className="block text-sm font-medium text-gray-700">Assignee:</label>
        </div>
        <div className="flex items-center">
            {avatarWithName(assignee, 8)}          
        </div>

        <div className="flex items-center">
          <label className="block text-sm font-medium text-gray-700">Priority:</label>
        </div>
        <div className="flex items-center">
          <p className="text-gray-600">{priority}</p>
        </div>
      </div>


      {/* Description Section */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded-lg"
          placeholder="Add a description"
          rows={4}
        />
      </div>

    </div>
    )
}

export default EditTaskCard;