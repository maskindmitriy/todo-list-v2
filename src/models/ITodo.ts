export interface ITodo {
  id: string;
  description: string;
  domain: string;
  priority: string;
  isDone: boolean;
}

export interface TodoResponse {
  id: string;
  todo: ITodo
}

export type Priority = '1' | '2' | '3';