import { TLoginUserDTO, TRegisterUserDTO } from '@/DTO/users/index.dto';
import { TFormMetadata } from '@/components/FormComponent/test';

export const regisFormMetadata: TFormMetadata<TRegisterUserDTO> = {
   formFields: [
      {
         field: 'fullName',
         type: 'string',
         placeholder: 'your full name',
         isHiddenField: false,
      },
      {
         field: 'email',
         type: 'email',
         placeholder: 'youremail@example.com',
         isHiddenField: false,
      },
      {
         field: 'password',
         type: 'password',
         placeholder: 'yourescurepassword',
         isHiddenField: false,
      },
   ],
   apiUrl: 'http://localhost:3000/users/register/api',
   submitMethod: 'POST',
};

export const loginFormMetadata: TFormMetadata<TLoginUserDTO> = {
   formFields: [
      {
         field: 'email',
         type: 'email',
         placeholder: 'youremail@example.com',
         isHiddenField: false,
      },
      {
         field: 'password',
         type: 'password',
         placeholder: 'yourescurepassword',
         isHiddenField: false,
      },
   ],
   apiUrl: 'http://localhost:3000/users/login/api',
   submitMethod: 'POST',
};
