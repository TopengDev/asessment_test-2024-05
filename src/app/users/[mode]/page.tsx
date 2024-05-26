'use client';

import { TLoginUserDTO } from '@/DTO/users/index.dto';
import { HorizontalSwitch } from '@/components/horizontal-switch';
import { useRef, useState } from 'react';
import { Form, TFormMetadata } from '@/components/FormComponent/formComponent';

const menus = [
   {
      id: 1,
      title: 'User',
   },
   {
      id: 2,
      title: 'Guest',
   },
];
export default function Page() {
   const [activeMenu, setActiveMenu] = useState<number>(menus[0].id);

   const formMetadata: TFormMetadata<TLoginUserDTO> = {
      formFields: [
         {
            field: 'email',
            type: 'email',
            placeholder: 'youremail@example.com',
         },
         {
            field: 'password',
            type: 'password',
            placeholder: 'yourescurepassword',
         },
      ],
      apiUrl: 'http://localhost:3000/users/login/api',
      submitMethod: 'POST',
   };

   return (
      <section className="xy-centered-view-container">
         <div className="simple-card-container">
            <div className="flex flex-col justify-center items-between gap-8 w-full">
               <HorizontalSwitch
                  activeState={activeMenu}
                  itemList={menus}
                  setActiveState={setActiveMenu}
               />
               {activeMenu === 1 ? (
                  <Form {...formMetadata}>
                     <div className="w-full flex justify-center">
                        <button
                           className="flex items-center justify-center px-8 py-3 bg-[#48AA52] border-solid border-black border-[2px] rounded-lg text-white transition-all duration-150 hover:bg-green-500 w-40 mt-8"
                           type="submit"
                        >
                           Login
                        </button>
                     </div>
                  </Form>
               ) : (
                  <div className="flex items-center justify-center w-full">
                     <button
                        className="flex items-center justify-center px-8 py-3 bg-[#48AA52] border-solid border-black border-[2px] rounded-lg text-white transition-all duration-150 hover:bg-green-500 w-40 mt-8"
                        type="submit"
                     >
                        Login
                     </button>
                  </div>
               )}
            </div>
         </div>
      </section>
   );
}
