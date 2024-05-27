'use client';

import { redirect, useRouter } from 'next/navigation';
import {
   Dispatch,
   PropsWithChildren,
   SetStateAction,
   createContext,
   useContext,
   useEffect,
   useState,
} from 'react';

export type TGlobalProviderProps = {
   fullName: string;
   email: string;
};

export type TGlobalContext = {
   userState: TGlobalProviderProps;
   setUserState: Dispatch<SetStateAction<TGlobalProviderProps>>;
};
const globalContext = createContext<TGlobalContext>({
   userState: { fullName: '', email: '' },
   setUserState: () => {},
});

export const GlobalContextProvider = (_props: PropsWithChildren) => {
   const router = useRouter();

   const [userState, setUserState] = useState<TGlobalProviderProps>({
      fullName: '',
      email: '',
   });

   useEffect(() => {
      console.log({ userState });
      if (userState.fullName && userState.email) router.replace('/tasks');
      else router.replace('/users');
   }, [userState]);

   return (
      <globalContext.Provider
         value={{
            setUserState,
            userState,
         }}
      >
         {_props.children}
      </globalContext.Provider>
   );
};

const useGlobalContext = () => useContext(globalContext);
export default useGlobalContext;
