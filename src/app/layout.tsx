'use client';

import { Inter } from 'next/font/google';
import './globals.css';
import { ModalProvider } from '@/components/Modal';
import useGlobalContext, { GlobalContextProvider } from './global.provider';
import { PropsWithChildren, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const inter = Inter({ subsets: ['latin'] });

function Layout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   const router = useRouter();
   const { userState, setUserState } = useGlobalContext();

   return (
      <>
         <nav className="top-nav-container">
            <div className="x-padded-centered-container">
               <div className="top-nav-padded-container">
                  <div></div>
                  <div className="flex items-center h-full gap-8">
                     <div
                        className="text-[32px] hover:cursor-pointer"
                        onClick={() => router.replace('/tasks')}
                     >
                        Task
                     </div>
                     <div
                        className="text-[32px] hover:cursor-pointer"
                        onClick={() => router.replace('/profile')}
                     >
                        Profile
                     </div>
                  </div>
                  <div
                     className="text-[36px] hover:cursor-pointer "
                     onClick={() => {
                        setUserState({ fullName: '', email: '' });
                     }}
                  >
                     {userState.fullName.toString()}
                  </div>
               </div>
            </div>
         </nav>
         {children}
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
