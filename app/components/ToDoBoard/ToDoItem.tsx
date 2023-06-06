import React from 'react';
import EditTask from '../Forms/EditTask';

interface ToDoItemProps {
  task: Task;
  onRemove: () => void;
  onToggleStatus: () => void
  onEditTask: (task: Task) => void
  };

  interface Task {
    id: string,
    ListId: string,
    title: string,
    description: string,
    deadline: string,
    isFinished: boolean;
  };
  

const ToDoItem: React.FC<ToDoItemProps> = ({ task, onRemove, onToggleStatus, onEditTask }) => {

  let formattedDate = '';
  if (task.deadline) {
    let date = new Date(task.deadline);
    if (!isNaN(date.getTime())) {
      formattedDate = ('0' + date.getDate()).slice(-2) + '/' + ('0' + (date.getMonth() + 1)).slice(-2) + ' ' + ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2);
    }
  }

  const editTask = (task: Task) => {
    onEditTask(task);
  }

  return (
    <div className="bg-neutral my-2 rounded-lg p-2 text-neutral-content navbar">
      <div className="flex-1">
        <EditTask onEditTask={editTask} task={task}/>
        <h3 className=''>{task.title}</h3>
      </div>
      <div className="">
        <div className="flex items-center">
          <svg className="h-4 w-4 text-neutral-content"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <rect x="4" y="5" width="16" height="16" rx="2" />  <line x1="16" y1="3" x2="16" y2="7" />  <line x1="8" y1="3" x2="8" y2="7" />  <line x1="4" y1="11" x2="20" y2="11" />  <line x1="11" y1="15" x2="12" y2="15" />  <line x1="12" y1="15" x2="12" y2="18" /></svg>
          <p className="ml-2">{formattedDate}</p>
        </div>
        <input type="checkbox" checked={task.isFinished === true ? true : false} className='checkbox ml-2 mr-2' title="Mark as Done" onClick={onToggleStatus}/>
        <button onClick={onRemove} className='btn btn-xs m-1' title="Rememove Task">
          <svg className="h-3 w-3 text-error" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <polyline points="3 6 5 6 21 6" /> <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /> <line x1="10" y1="11" x2="10" y2="17" /> <line x1="14" y1="11" x2="14" y2="17" /></svg>
        </button>
      </div>
    </div>
  );
};

export default ToDoItem;
