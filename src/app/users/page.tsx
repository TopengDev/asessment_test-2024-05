'use client';

import { TLoginUserDTO, TRegisterUserDTO } from '@/DTO/users/index.dto';
import { HorizontalSwitch } from '@/components/horizontal-switch';
import {
   Dispatch,
   PropsWithChildren,
   SetStateAction,
   useEffect,
   useRef,
   useState,
} from 'react';
import useFormContext, {
   FormProvider,
   TFormMetadata,
   FormFieldsComponent,
} from '@/components/FormComponent';
import useGlobalContext from '@/app/global.provider';
import { loginFormMetadata, regisFormMetadata } from './form-metadata';

type TUsersMenu = {
   id: number;
   title: string;
   onChoice?: (props?: any) => any;
};

function UsersPage(_props: {}) {
   const { setUserState } = useGlobalContext();

   const { formMetadata, formValuesRef, response, setCurrentFormMetadata } =
      useFormContext();
   const guestLoginFormMetadata: TFormMetadata<TLoginUserDTO> = {
      formFields: [],
      apiUrl: 'http://localhost:3000/users/login/api',
      submitMethod: 'POST',
      onSubmitCallback: () =>
         setUserState({
            email: '',
            fullName: 'Guest',
         }),
   };

   const menus: TUsersMenu[] = [
      {
         id: 1,
         title: 'Register',
         onChoice: () => setCurrentFormMetadata(regisFormMetadata),
      },
      {
         id: 2,
         title: 'Login',
         onChoice: () => setCurrentFormMetadata(loginFormMetadata),
      },
      {
         id: 3,
         title: 'Guest',
         onChoice: () => setCurrentFormMetadata(guestLoginFormMetadata),
      },
   ];
   const [activeMenu, setActiveMenu] = useState<number>(menus[0].id);

   useEffect(() => {
      if (response?.isSuccess) {
         setUserState(response.data);
      }
   }, [response, setUserState]);

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
                  <FormFieldsComponent
                     formFields={formMetadata.formFields}
                     formValuesRef={formValuesRef}
                  />
               )}
               <div className="w-full flex justify-center items-center">
                  <button
                     className="flex items-center justify-center px-8 py-3 bg-[#48AA52] border-solid border-black border-[2px] rounded-lg text-white transition-all duration-150 hover:bg-green-500 w-40 mt-8"
                     type="submit"
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
   const [currentFormMetadata, setCurrentFormMetadata] = useState<
      | TFormMetadata<TRegisterUserDTO>
      | TFormMetadata<TLoginUserDTO>
      | TFormMetadata<any>
   >(regisFormMetadata);

   return (
      <FormProvider
         {...currentFormMetadata}
         setCurrentFormMetadata={setCurrentFormMetadata}
      >
         <UsersPage />
      </FormProvider>
   );
}
