import { PropsWithChildren } from 'react';

export const ModalProvider = (_props: PropsWithChildren) => {
   return (
      <div className="w-[100vw] h-[100vh] absolute top-0 left-0  z-10">
         {_props.children}
      </div>
   );
};
