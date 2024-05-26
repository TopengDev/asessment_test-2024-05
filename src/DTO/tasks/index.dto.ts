export type TAddTaskDTO = {
   title: string;
   desc: string;
   authorEmail: string;
};
export const initialAddTaskDTO: TAddTaskDTO = {
   title: '',
   desc: '',
   authorEmail: '',
};
export type TDeleteTaskDTO = {
   id: number;
};
export const initialDeleteTaskDTO: TDeleteTaskDTO = {
   id: NaN,
};
export type TUpdateTaskDto = {
   id: number;
   title: string;
   desc: string;
};
export const initialUpdateTaskDTO: TUpdateTaskDto = {
   id: NaN,
   title: '',
   desc: '',
};
export type TMarkTaskDTO = {
   id: number;
};
export const initialMarkTaskDTO: TMarkTaskDTO = {
   id: NaN,
};
export type TTaskListDTO = {
   email: string;
};
export const initialTaskListDTO: TTaskListDTO = {
   email: '',
};
export type TTaskListFilter = {
   authorEmail: string;
   markedDone?: 'T' | 'F' | 'A';
   title?: string;
   desc?: string;
   orderBy?: 'oldest' | 'newest';
   page?: number;
   limit?: number;
};
export const initialTaskListFilterDTO: TTaskListFilter = {
   authorEmail: '',
   orderBy: 'newest',
   page: 1,
   limit: 10,
};
