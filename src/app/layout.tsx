'use client';

import { Inter } from 'next/font/google';
import './globals.css';
import { ModalProvider } from '@/components/Modal';
import useGlobalContext, { GlobalContextProvider } from './global.provider';
import { PropsWithChildren, useEffect } from 'react';

const inter = Inter({ subsets: ['latin'] });

function Layout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   const { userState, setUserState } = useGlobalContext();

   return (
      <>
         <nav className="top-nav-container">
            <div className="x-padded-centered-container">
               <div className="top-nav-padded-container">
                  <div></div>
                  <div className="flex items-center h-full gap-8">
                     <div className="text-[32px]">Task</div>
                     <div className="text-[32px]">Profile</div>
                  </div>
                  <div
                     className="text-[36px]"
                     onClick={() => {
                        setUserState({ fullName: '' });
                     }}
                  >
                     {userState.fullName.toString()}
                  </div>
               </div>
            </div>
         </nav>
         <ModalProvider>{children}</ModalProvider>
      </>
   );
}

export default function RootLayout(_props: PropsWithChildren) {
   return (
      <html lang="en">
         <body className={`${inter.className} relative`}>
            <GlobalContextProvider>
               <Layout>{_props.children}</Layout>;
            </GlobalContextProvider>
         </body>
      </html>
   );
}
