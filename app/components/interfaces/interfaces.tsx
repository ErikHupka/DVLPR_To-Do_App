export interface Feedback {
  name: string,
  email: string,
  description: string,
}

export interface Task {
  id: string;
  ListId: string,
  title: string;
  description: string;
  deadline: string;
  isFinished: boolean;
}

export interface TaskCreationData {
  listId: string,
  title: string,
  description: string,
  deadline: string;
  isFinished: boolean;
}

export interface List {
  id: string;
  title: string;
}