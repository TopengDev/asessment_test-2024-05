'use client';

import { Inter } from 'next/font/google';
import './globals.css';
import { ModalProvider } from '@/components/Modal';
import useGlobalContext, { GlobalContextProvider } from './global.provider';
import { PropsWithChildren } from 'react';

const inter = Inter({ subsets: ['latin'] });

function Layout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   const { userState } = useGlobalContext();

   return (
      <html lang="en">
         <body className={`${inter.className} relative`}>
            <nav className="top-nav-container">
               <div className="x-padded-centered-container">
                  <div className="top-nav-padded-container">
                     <div></div>
                     <div className="flex items-center h-full gap-8">
                        <div className="text-[32px]">Task</div>
                        <div className="text-[32px]">Profile</div>
                     </div>
                     <div className="text-[36px]">{userState.fullName}</div>
                  </div>
               </div>
            </nav>
            <GlobalContextProvider>
               <ModalProvider>{children}</ModalProvider>
            </GlobalContextProvider>
         </body>
      </html>
   );
}

export default function RootLayout(_props: PropsWithChildren) {
   return (
      <GlobalContextProvider>
         <Layout>{_props.children}</Layout>
      </GlobalContextProvider>
   );
}
