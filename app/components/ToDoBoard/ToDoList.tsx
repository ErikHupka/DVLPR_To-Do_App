import React, { useMemo } from 'react';
import ToDoItem from './ToDoTask';
import AddToDoItemForm from '../Forms/AddToDoItemForm';
import DeleteList from '../Forms/DeleteList';
import EditTask from '../Forms/EditTask';
import EditList from '../Forms/EditList';
import { Task, TaskCreationData, List } from '../interfaces/interfaces'

// Define ToDoListProps to pass to ToDoBoard.tsx

interface ToDoListProps {
  list: List;
  tasks: Task[] | undefined;
  onAddTask: (task: TaskCreationData) => void;
  onRemove: () => void;
  onRemoveTask: (taskId: string) => void;
  onToggleStatus: (taskId: string) => void;
  onEditTask: (task: Task) => void;
  onEditList: (list: List) => void;
}

const ToDoList: React.FC<ToDoListProps> = ({ list, tasks, onRemove, onAddTask, onRemoveTask, onToggleStatus, onEditTask, onEditList }) => {
  

  //Filter Tasks related to each list based on the ListID value

  const filteredTasks = useMemo(() => {
    if (tasks) {
      return tasks.filter((task) => task.ListId === list.id);
    }
    return [];
  }, [tasks, list.id]);


  //Pass values up to the ToDoBoard.tsx

  const addTask = (task: TaskCreationData) => {
    onAddTask(task);
  };

  const editTask = (task: Task) => {
    onEditTask(task);
  };

  const editList = (list: List) => {
    console.log(list);
    onEditList(list);
  }

  return (
    <div className="bg-base-300 p-2 rounded-lg w-96">

      {/** Edit List button, Show Title, AddTask Button, Delete Current List */}

      <div className='flex items-center bg-base-100 overflow-hidden'>
        <EditList onEditList={editList} list={list}/>
        <h2 className='flex-1 p-3 text-base-content'>{list.title}</h2>
        <AddToDoItemForm onAddTask={addTask} />
        <DeleteList onDeleteList={onRemove} />
      </div>

      {/** Show related ToDoItems */}

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
