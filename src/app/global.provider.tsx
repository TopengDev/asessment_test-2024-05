'use client';

import { useRouter } from 'next/navigation';
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
   email: string;
   fullName: string;
};

export type TGlobalContext = {
   userState: {
      email: string;
      fullName: string;
   };
   setUserState: Dispatch<
      SetStateAction<{
         email: string;
         fullName: string;
      }>
   >;
};
const globalContext = createContext<TGlobalContext>({
   userState: {
      email: '',
      fullName: '',
   },
   setUserState: () => {},
});

export const GlobalContextProvider = (_props: PropsWithChildren) => {
   const router = useRouter();
   const [userState, setUserState] = useState<TGlobalProviderProps>({
      email: '',
      fullName: '',
   });

   useEffect(() => {
      if (userState) {
         if (!userState.email || !userState.fullName) {
            router.replace('/users');
         } else {
            router.replace('/tasks');
         }
      }
   }, [userState, router]);

   return (
      <globalContext.Provider
         value={{
            userState,
            setUserState,
         }}
      >
         {_props.children}
      </globalContext.Provider>
   );
};

const useGlobalContext = () => useContext(globalContext);
export default useGlobalContext;
