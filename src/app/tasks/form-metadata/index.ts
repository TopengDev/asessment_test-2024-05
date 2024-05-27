'use client';
import {
   TAddTaskDTO,
   TMarkTaskDTO,
   TUpdateTaskDto,
} from '@/DTO/tasks/index.dto';
import { TFormMetadata } from '@/components/FormComponent/test';

export const addTaskFormMetadata: TFormMetadata<TAddTaskDTO> = {
   formFields: [
      {
         field: 'title',
         type: 'string',
         placeholder: 'title',
         isHiddenField: false,
      },
      // {
      //    field: 'desc',
      //    type: 'string',
      //    placeholder: 'desc',
      //    isHiddenField: false,
      // },
      {
         field: 'authorEmail',
         type: 'string',
         placeholder: 'desc',
         isHiddenField: true,
         value: '',
      },
   ],
   apiUrl: 'http://localhost:3000/tasks/add/api',
   submitMethod: 'POST',
};
export const updateTaskFormMetadata: TFormMetadata<TUpdateTaskDto> = {
   formFields: [
      {
         field: 'title',
         type: 'string',
         placeholder: 'title',
         isHiddenField: false,
      },
   ],
   apiUrl: 'http://localhost:3000/tasks/update/api',
   submitMethod: 'POST',
};
