'use client';

import useGlobalContext, { GlobalContextProvider } from '../global.provider';

export default function Page() {
   const { userState } = useGlobalContext();

   return (
      <div className="xy-centered-view-container">
         <div>
            <div>Email: {userState.email}</div>
            <div>Fullname: {userState.fullName}</div>
         </div>
      </div>
   );
}
