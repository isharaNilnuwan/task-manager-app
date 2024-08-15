import { TaskConfigs, User } from '@/types/task.types';
import React, { useMemo, useState } from 'react';
import { avatarWithName, getAvater } from '../common/avatar';
import { getRemainingTimeText, get_D_M_Y_Format, get_M_D_Format } from '@/utils/appUtils';
import CustomDropdownMenu from '../common/customDropdown';
import { Priority, TaskTypes } from '@/constants/constants';
import CustomCalendar from '../common/customCalander';
import { date_M_D_FormatWrapper, priorityTaskWrapper } from '../common/wrappers';
import { CalendarCircle, ProfileCircle, Flag, CloseCircle, DocumentText } from 'iconsax-react';
import { DropdownMenuItem } from '../ui/dropdown-menu';
import { users } from '@/config/users.config';
import { renderAvatarLabel, renderCalanderlabel, renderDefaultDateSelectView, renderDefaultUserSelectView, renderPriorityLabel, renderSelectedDate, renderSelectedPriority, renderSelectedUser, renderTaskStatusView, rendertaskStatusLabel } from './editorutils';


interface EditTaskCardProps {
  task: TaskConfigs;
  // onSave: (updatedTask: TaskItem) => void;
}

const EditTaskCard: React.FC<EditTaskCardProps> = ({ task }) => {
  const [title, setTitle] = useState(task.name);
  const [taskStatus, setTaskStatus] = useState<TaskTypes>(task.type);
  const [dueDate, setDueDate] = useState<string>(task.date);
  const [selectedUser, setSelectedUser] = useState<User>(task.user);
  const [selectedPriority, setselectedPriority] = useState<Priority>(task.priority);
  const [description, setDescription] = useState('');
  const [popoverOpen, setCalanderOpen] = useState<boolean>(false);


  const nuetrelAvatarColor = '#9f9f9f';
  const avatarSize = 27;


  const priorityTriggerElem = useMemo(() => {
    return selectedPriority ? (
      <>{renderSelectedPriority(selectedPriority, setselectedPriority)}</>
    ) : (
      <div className="flex items-center bg-gray-100 text-sm rounded-lg px-2 py-1 text-gray-600">
        Set Priority
      </div>
    );
  }, [selectedPriority]);



  const calendarSelectTriggerElem = useMemo(() => {
    return dueDate ? (
      <>{renderSelectedDate(dueDate, setDueDate)}</>
    ) : (
      <>{renderDefaultDateSelectView(nuetrelAvatarColor, avatarSize)}</>
    );
  }, [dueDate]);

  const userSelectTriggerElem = useMemo(() => {
    return selectedUser ? (
      <>{renderSelectedUser(selectedUser, setSelectedUser)}</>
    ) : (
      <>{renderDefaultUserSelectView(nuetrelAvatarColor, avatarSize)}</>

    );
  }, [selectedUser]);

  const handleDateSelect: (date: Date) => void = (selectedDate) => {
    setDueDate(selectedDate.toISOString());
    setCalanderOpen(false);
  };


  const renderCalander = () => {
    return (
      <CustomCalendar
        popoverOpen={popoverOpen}
        handleCalanderOpenChange={(open) => {
          setCalanderOpen(open)
        }}
        calendarSelectTriggerElem={calendarSelectTriggerElem}
        date={new Date(dueDate) || new Date()}
        handleDateSelect={handleDateSelect}
      />
    )
  }

  const renderPrioritySelection = () => {
    return (
      <CustomDropdownMenu
        dropDownWidth='w-50'
        dropdownTriggerElement={priorityTriggerElem}
        render={
          () => (
            <>{
              Object.values(Priority).map((priority) => (
                <DropdownMenuItem key={priority}
                  onSelect={() => setselectedPriority(priority)}
                  aria-selected={selectedPriority === priority}
                >
                  {
                    priority
                  }
                </DropdownMenuItem>
              ))
            }</>
          )
        }
      />
    );
  }

  const renderProfilePicture = () => {
    return (
      <CustomDropdownMenu
        dropDownWidth='w-56'
        dropdownTriggerElement={userSelectTriggerElem}
        render={() => (
          <>
            {
              users.map((user) => (
                <DropdownMenuItem key={user.id}
                  onSelect={() => setSelectedUser(user)}
                  aria-selected={selectedUser === user}
                  className="gap-1"
                >
                  {
                    getAvater(user, 7)
                  }
                  {user.name}
                </DropdownMenuItem>
              ))
            }
          </>
        )}
      />
    )
  }

  const sections = [
    { label: rendertaskStatusLabel(nuetrelAvatarColor, avatarSize), content: renderTaskStatusView(task.type, avatarSize) },
    { label: renderCalanderlabel(nuetrelAvatarColor, avatarSize), content: renderCalander() },
    { label: renderAvatarLabel(nuetrelAvatarColor, avatarSize), content: renderProfilePicture() },
    { label: renderPriorityLabel(nuetrelAvatarColor, avatarSize), content: renderPrioritySelection() },
  ];

  const renderTitle = () => {
    return (
      <div className="mb-4">
          <textarea
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded-lg text-2xl"
            placeholder="Task Title"
          />
        </div>
    )
  }
  const renderDetailsSection = () => {
    return (
      <>        
        <div className="grid grid-cols-2 gap-x-4 gap-y-6 mb-4 mt-10">
          {sections.map((section, index) => (
            <React.Fragment key={index}>
              <div className="flex items-center">
                <label className="block text-sm font-medium text-gray-700">{section.label}</label>
              </div>
              <div className="flex items-center">
                {section.content}
              </div>
            </React.Fragment>
          ))}
        </div>        
        </>
    )
  }

  const renderDescription = () => {
    return(
      <div className='mt-10'>
          <div className='flex flex-row items-center'>
            <DocumentText size={avatarSize} color={nuetrelAvatarColor} /> <label className="block ml-2 text-sm font-medium text-gray-700">Description</label>
          </div>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded-lg mt-3"
            placeholder="Add a description"
            rows={8}
          />
        </div>
    )
  }


  return (
    <div className="max-w-lg mx-auto p-4  rounded-lg">
      {renderTitle()}
      {renderDetailsSection()}
      {renderDescription()}
    </div>
  )
}

export default EditTaskCard;