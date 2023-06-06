const BASE_URL = 'https://647c868bc0bae2880ad0d09c.mockapi.io/Lists';
import { List, Task, TaskCreationData } from "../interfaces/interfaces";
  
// Fetch TASKS from the mockAPI

export async function fetchTasks(listIds: List[]): Promise<Task[]> {
const allTasks: Task[] = [];

for (const list of listIds) {
    const response = await fetch(`${BASE_URL}/${list.id}/Tasks`);
    if (!response.ok) {
    throw new Error('Error while fetching tasks');
    }
    const tasks = await response.json();
    allTasks.push(...tasks);
}
return allTasks;
}
  

// Create new Task in a List

export async function createTask(listId: string, task: TaskCreationData) {
    task.listId = listId;
    const response = await fetch(`${BASE_URL}/${listId}/Tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    });
    if (!response.ok) {
      throw new Error(`'Error while creating new Task'`);
    }
    return response.json();
}


// Delete a specific Task from a List

export async function deleteTask(listId: string, taskId: string) {
    const response = await fetch(`${BASE_URL}/${listId}/Tasks/${taskId}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Error while deleting current Task');
    }
    return response.json();
}


// Delete all Related Tasks during List deletion

export async function deleteRelatedTasks(idToRemove: string, task: Task) {
    const response = await fetch(`${BASE_URL}/${idToRemove}/Tasks/${task.id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Error while deleting current Task');
    }
    return response.json();
}

    

export async function toggleTaskStatus(listId: string, taskId: string) {

    // Get the current status
    const response = await fetch(`${BASE_URL}/${listId}/Tasks/${taskId}`);
    if (!response.ok) {
      throw new Error('Error while fetching the task');
    }
    const task: Task = await response.json();
    //Check current status
    const newStatus = task.isFinished === true ? false : true;
  
    // Update status
    const updateResponse = await fetch(`${BASE_URL}/${listId}/Tasks/${taskId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...task, isFinished: newStatus }),
    });
    if (!updateResponse.ok) {
      throw new Error('Problem toggling task status');
    }
    return updateResponse.json();
  }

// EDIT TASK - Update API call
export async function editTask(task: Task) {

  const response = await fetch(`${BASE_URL}/${task.ListId}/Tasks/${task.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  });
  if (!response.ok) {
    throw new Error('Problem with updating task');
  }
  return response.json();
}
  