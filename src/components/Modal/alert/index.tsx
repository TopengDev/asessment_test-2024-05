import { useState } from 'react';
import { ModalProvider } from '..';

export function AlertModal(_props: {
   icon: string;
   title: string;
   message: string;
}) {
   <div className="w-80 h-40 bg-white drop-shadow-xl rounded-xl m-24 absolute top-0 right-0 flex ustify-center items-center p-8">
      <div className="w-full h-full">
         <p className="font-bold text-2xl">{_props.title}</p>
         <p className="text-base">{_props.message}</p>
      </div>
   </div>;
}

export function AlertModalProvider() {
   const [active, setActive] = useState<boolean>(false);
   const alert = (time: number) => {
      setActive(true);

      setTimeout(() => {
         setActive(false);
      }, time);
   };
   const toggle = () => {
      setActive(!active);
   };

   return <ModalProvider></ModalProvider>;
}
