import React, { useMemo } from 'react';
import ToDoItem from './ToDoItem';
import AddToDoItemForm from '../Forms/AddToDoItemForm';
import DeleteList from '../Forms/DeleteList';
import EditTask from '../Forms/EditTask';
import EditList from '../Forms/EditList';


interface Task {
  id: string;
  ListId: string,
  title: string;
  description: string;
  deadline: string;
  isFinished: boolean;
}

interface TaskCreationData {
  listId: string,
  title: string,
  description: string,
  deadline: string;
  isFinished: boolean;
}

interface ToDoListProps {
  id: string;
  title: string;
  tasks: Task[] | undefined;
  onAddTask: (task: TaskCreationData) => void;
  onRemove: () => void;
  onRemoveTask: (taskId: string) => void;
  onToggleStatus: (taskId: string) => void;
  onEditTask: (task: Task) => void;
  onEditList: (listId: string, title: string) => void;
}


const ToDoList: React.FC<ToDoListProps> = ({ id, title, tasks, onRemove, onAddTask, onRemoveTask, onToggleStatus, onEditTask, onEditList }) => {
  const filteredTasks = useMemo(() => {
    if (tasks) {
      return tasks.filter((task) => task.ListId === id);
    }
    return [];
  }, [tasks, id]);

  const addTask = (task: TaskCreationData) => {
    onAddTask(task);
  };

  const editTask = (task: Task) => {
    onEditTask(task);
  };

  const editList = (listId: string, title: string) => {
    onEditList(listId, title);
  }

  return (
    <div className="bg-base-300 p-2 rounded-lg w-96">
      <div className='flex items-center bg-base-100 overflow-hidden'>
      <EditList onEditList={editList} listId={id} title={title}/>
      <h2 className='flex-1 p-3 text-base-content'>{title}</h2>

      <div className="flex-none gap-2">
        <div className="form-control">
          </div>
        </div>
        <AddToDoItemForm onAddTask={addTask} />
        <DeleteList onDeleteList={onRemove} />

      </div>
      <div className="h-96 overflow-scroll">
        {filteredTasks.map((task) => (
          <ToDoItem
            key={task.id}
            task={task}
            onRemove={() => onRemoveTask(task.id)}
            onToggleStatus={() => onToggleStatus(task.id)}
            onEditTask={editTask}
        />
      ))}
    </div>
    </div>
  );
};

export default ToDoList;
