import useGlobalContext from '../global.provider';

export default function Page() {
   const { userState } = useGlobalContext();

   return (
      <div className="xy-centered-container">
         <div>Email: {userState.email}</div>
         <div>Fullname: {userState.fullName}</div>
      </div>
   );
}
