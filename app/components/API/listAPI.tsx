const BASE_URL = 'https://647c868bc0bae2880ad0d09c.mockapi.io';
import { List } from "../interfaces/interfaces";


// FETCH LISTS from mockAPI
export async function fetchLists(): Promise<List[]> {
    const response = await fetch(`${BASE_URL}/Lists`);
    if (!response.ok) {
        throw new Error('Error while fetching Lists');
    }
    return response.json();
}


// CREATE NEW LIST 
export async function createList(title: string) {
    const response = await fetch(`${BASE_URL}/Lists`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title }),
    });
    if (!response.ok) {
        throw new Error('Error while creating new List');
    }
    return response.json();
}

// DELETE A SPECIFIC LIST 
export async function deleteList(listId: string) {
    const response = await fetch(`${BASE_URL}/Lists/${listId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Error while deleting the list');
    }
    return response.json();
  }

// EDIT LIST 
export async function editList(list: List) {
  console.log(list);
  const response = await fetch(`${BASE_URL}/Lists/${list.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(list),
  });
  if (!response.ok) {
    throw new Error('Problem with updating task');
  }
  return response.json();    
}
  