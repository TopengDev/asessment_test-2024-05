'use client';

import { TLoginUserDTO } from '@/DTO/users/index.dto';
import { HorizontalSwitch } from '@/components/horizontal-switch';
import { PropsWithChildren, useState } from 'react';
import useForm, {
   FormProvider,
   TFormMetadata,
   Form,
} from '@/components/FormComponent/test';
import useGlobalContext from '@/app/global.provider';
import { loginFormMetadata, regisFormMetadata } from './form-metadata';

type TUsersMenu = {
   id: number;
   title: string;
   onChoice?: (props?: any) => any;
};

function UsersPage(_props: {}) {
   const { setUserState } = useGlobalContext();

   const { formMetadata, setFormMetadata, submit, formValues, setFormValues } =
      useForm();
   const guestLoginFormMetadata: TFormMetadata<TLoginUserDTO> = {
      formFields: [],
      apiUrl: '',
      submitMethod: 'POST',
      customSubmitCallback: () =>
         setUserState({ fullName: 'Guest', email: 'guest' }),
   };

   const menus: TUsersMenu[] = [
      {
         id: 1,
         title: 'Register',
         onChoice: () => setFormMetadata(regisFormMetadata),
      },
      {
         id: 2,
         title: 'Login',
         onChoice: () => setFormMetadata(loginFormMetadata),
      },
      {
         id: 3,
         title: 'Guest',
         onChoice: () => setFormMetadata(guestLoginFormMetadata),
      },
   ];
   const [activeMenu, setActiveMenu] = useState<number>(menus[0].id);

   return (
      <section className="xy-centered-view-container">
         <div className="simple-card-container">
            <div className="flex flex-col justify-center items-between gap-8 w-full">
               <HorizontalSwitch
                  activeState={activeMenu}
                  itemList={menus}
                  setActiveState={setActiveMenu}
               />
               {activeMenu !== 3 && (
                  <Form
                     formFields={formMetadata?.formFields || []}
                     formValues={formValues}
                     setFormValues={setFormValues}
                  />
               )}
               <div className="w-full flex justify-center items-center">
                  <button
                     className="flex items-center justify-center px-8 py-3 bg-[#48AA52] border-solid border-black border-[2px] rounded-lg text-white transition-all duration-150 hover:bg-green-500 w-40 mt-8"
                     onClick={() =>
                        submit(formMetadata, formValues, (response) => {
                           setUserState({
                              fullName: response.data.fullName,
                              email: response.data.email,
                           });
                        })
                     }
                  >
                     {activeMenu === 1 ? 'Register' : 'Login'}
                  </button>
               </div>
            </div>
         </div>
      </section>
   );
}

export default function Page(_props: PropsWithChildren) {
   return (
      <FormProvider initialFormMetadata={regisFormMetadata}>
         <UsersPage />
      </FormProvider>
   );
}
