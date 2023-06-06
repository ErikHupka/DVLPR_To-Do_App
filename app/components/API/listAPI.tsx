const BASE_URL = 'https://647c868bc0bae2880ad0d09c.mockapi.io';


interface List {
    id: string;
    title: string;
  }


export async function fetchLists(): Promise<List[]> {
    const response = await fetch(`${BASE_URL}/Lists`);
    if (!response.ok) {
        throw new Error('Error while fetching Lists');
    }
    return response.json();
}

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

export async function deleteList(listId: string) {
    const response = await fetch(`${BASE_URL}/Lists/${listId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Error while deleting the list');
    }
    return response.json();
  }


export async function editList(listId: string, title: string) {
  const newList = {
    id: listId,
    title: title
  }

  const response = await fetch(`${BASE_URL}/Lists/${listId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newList),
  });
  if (!response.ok) {
    throw new Error('Problem with updating task');
  }
  return response.json();    
}
  