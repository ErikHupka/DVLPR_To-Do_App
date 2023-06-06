import React, { useState } from 'react';
import { useQueryClient, useMutation, useQuery } from 'react-query';
import * as listAPI from '../API/listAPI';
import * as taskAPI from '../API/taskAPI';
import AddToDoListForm from '../Forms/AddToDoListForm';
import ToDoList from './ToDoList';
import { TaskCreationData, List, Task } from '../interfaces/interfaces';

const ToDoBoard: React.FC = () => {


  // Define new Query Hook for Lists and Tasks

  const queryClient = useQueryClient();
  const { data: allLists = [], isLoading: listsLoading } = useQuery<List[]>('lists', listAPI.fetchLists);
  const { data: allTasks = [], isLoading: tasksLoading } = useQuery<Task[]>('tasks', () => taskAPI.fetchTasks(allLists), {
    enabled: !!allLists.length
  });  


  // Define hooks for Search Bar and Filter Radio buttons

  const [searchText, setSearchText] = useState('');
  const [filterTaskRadio, setFilterTaskRadio] = useState('all');


  // Filter Tasks via Radio buttons on the NavBar

  const getFilteredTasks = (tasks: Task[]) => {
    switch (filterTaskRadio) {
      case 'all':
        return tasks;
      case 'todo':
        return tasks.filter(task => !task.isFinished);
      case 'finished':
        return tasks.filter(task => task.isFinished);
    }
  }


  // CREATE LIST 

  const createListMutation = useMutation(listAPI.createList, {
    onSuccess: (data) => {
      queryClient.setQueryData<List[]>(['lists'], (prevLists = []) => [...prevLists, data]);
      queryClient.invalidateQueries('tasks');
      queryClient.invalidateQueries('lists');
    },
  });

  // MUTATION - Create List

  const addToDoList =  (title: string) => {
    createListMutation.mutate(title);
  };


  // DELETE LIST

  const deleteListMutation = useMutation(listAPI.deleteList, {
    onSuccess: (data) => {
      queryClient.setQueryData<List[]>(['lists'], (prevLists = []) => prevLists.filter(list => list.id !== data.id));
      queryClient.invalidateQueries('lists');
    },
  });


  // DELETE ALL Related tasks to a list

  const deleteRelatedTasks = useMutation(
    ({ idToRemove, task }: { idToRemove: string; task: Task }) => 
    taskAPI.deleteRelatedTasks(idToRemove, task),
    {
    onSuccess: (data) => {
      queryClient.setQueryData<Task[]>(['tasks'], (prevTasks = []) => prevTasks.filter(task => task.id !== data.id));
      queryClient.invalidateQueries('tasks');
    },
  });


  // MUTATION - Delete List

  const deleteToDoList = (idToRemove: string) => {

    const taskToRemove = allTasks.filter((task) => task.ListId === idToRemove);

    taskToRemove.map((task) => {
      deleteRelatedTasks.mutate({ idToRemove, task });
    }),


    deleteListMutation.mutate(idToRemove)

  };


  // CREATE TASK 
  
  const createTaskMutation = useMutation(
    ({ listId, task }: { listId: string; task: TaskCreationData }) =>
      taskAPI.createTask(listId, task),
    {
      onSuccess: (data) => {
        queryClient.setQueryData<Task[]>(['tasks'], (prevTasks = []) => [...prevTasks, data])
        queryClient.invalidateQueries('tasks');
      },
    }
  );


  // MUTATION - Create Task

  const addTask = (listId: string, task: TaskCreationData) => {
    createTaskMutation.mutate({ listId, task });
  };


  // DELETE TASK

  const deleteTaskMutation = useMutation(
    ({ listId, taskId }: { listId: string; taskId: string }) => 
      taskAPI.deleteTask(listId, taskId),
    {
      onSuccess: (data) => {
        queryClient.setQueryData<Task[]>(['tasks'], (prevTasks = []) => prevTasks.filter(task => task.id !== data.id));
        queryClient.invalidateQueries('tasks');
      },
    }
  );


  // MUTATION - Delete Task

  const removeTask = (listId: string, taskId: string) => {
    deleteTaskMutation.mutate({ listId, taskId });
  };
  

  // CHANGE STATUS of the current Task

  const toggleTaskStatusMutation = useMutation(
    ({ listId, taskId }: { listId: string; taskId: string }) =>
      taskAPI.toggleTaskStatus(listId, taskId),
    {
      onSuccess: (data) => {
        queryClient.setQueryData<Task[]>(['tasks'], (prevTasks = []) => 
        prevTasks.map((task) => task.id === data.id ? { ...task, ...data} : task))
        queryClient.invalidateQueries('tasks');
      },
    }
  );


  // MUTATION - Change Status

  const toggleTaskStatus = (listId: string, taskId: string) => {
    toggleTaskStatusMutation.mutate({ listId, taskId });
  };

  
  // EDIT TASK

  const editTaskMutation = useMutation(taskAPI.editTask,
    {
      onSuccess: (data) => {
        queryClient.setQueryData<Task[]>(['tasks'], (prevTasks = []) => 
        prevTasks.map((task) => task.id === data.id ? { ...task, ...data} : task))
        queryClient.invalidateQueries('tasks');
      }
    }
  )


  // MUTATION - Edit Task

  const editTask = (task: Task) => {
    editTaskMutation.mutate(task);
  }


  // EDIT LIST

  const editListMutation = useMutation(listAPI.editList, 
    {
      onSuccess: (data) => {
        queryClient.setQueryData<List[]>(['lists'], (prevLists = []) =>
        prevLists.map((list) => data.id === list.id ? { ...list, ...data} : list))
        queryClient.invalidateQueries('lists');
      }
    }
  )


  //MUTATION - Edit List
  
  const editList = (list: List) => {
    editListMutation.mutate(list);
  }


  // Show loading animation while Lists and Tasks are fetching from the API

  if (listsLoading) {
    return (
      <div className='max-w-full min-h-screen bg-neutral flex justify-center content-center'>
      <span className="loading loading-spinner loading-lg"></span>
      </div>
      )}

  if (tasksLoading) {
    return (
    <div className='max-w-full min-h-screen bg-neutral flex justify-center content-center'>
      <span className="loading loading-spinner loading-lg"></span>
    </div>
    )}


  // RETURN

  return (
    <main className="max-w-full min-h-screen bg-neutral">

      {/** To Do List form (Filter, Search Bar, Create New List button) */}
      <AddToDoListForm 
      onAddToDoList={addToDoList} 
      setFilterTaskRadio={setFilterTaskRadio} 
      searchText={searchText}
      setSearchText={setSearchText}/>
      
      {/** Generate and filter Lists and Tasks */}
      <div className="max-w-screen flex flex-wrap justify-evenly gap-6 p-8">
      {allLists?.map((list) => {
        const tasksForList = getFilteredTasks(allTasks?.filter((task) => 
        task.ListId === list.id && task.title.toLowerCase().includes(searchText.toLowerCase())) || []);
          return (
            <ToDoList
              key={list.id}
              list={list}
              tasks={tasksForList}
              onRemove={() => deleteToDoList(list.id)}
              onAddTask={(task) => addTask(list.id, task)}
              onRemoveTask={(taskId) => removeTask(list.id, taskId)}
              onToggleStatus={(taskId) => toggleTaskStatus(list.id, taskId)}
              onEditTask={(task) => editTask(task)}
              onEditList={(list) => editList(list)}
            />
  );
})}
      </div>
    </main>
  );
};

export default ToDoBoard;
