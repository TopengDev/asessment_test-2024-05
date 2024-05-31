import { Dispatch, SetStateAction } from 'react';
import { TTaskItem } from '..';
import {
   LucidePencil,
   LucideBadge,
   LucideBadgeCheck,
   LucideTrash,
} from 'lucide-react';
import { updateTaskFormMetadata } from '@/app/tasks/form-metadata';
import useGlobalContext from '@/app/global.provider';

export function TaskItem(
   _props: TTaskItem & {
      refetch: (props?: any) => any;
      setFormMode: Dispatch<SetStateAction<any>>;
   },
) {
   const { userState } = useGlobalContext();
   const mark = async () => {
      try {
         const res: any = await (
            await fetch('http://localhost:3002/tasks/mark/api', {
               method: 'POST',
               body: JSON.stringify(_props),
               headers: {
                  'Content-Type': 'application/json',
               },
            })
         ).json();
         if (res.isSuccess) _props.refetch();
      } catch (e: any) {}
   };
   const deletee = async () => {
      try {
         const res: any = await (
            await fetch('http://localhost:3002/tasks/delete/api', {
               method: 'POST',
               body: JSON.stringify(_props),
               headers: {
                  'Content-Type': 'application/json',
               },
            })
         ).json();
         if (res.isSuccess) _props.refetch();
      } catch (e: any) {}
   };

   return (
      <div className="w-full p-4 bg-[#D0D0D0] rounded-lg">
         <div className="w-full justify-between flex h-full">
            <div className="h-full flex flex-col gap-2">
               <div className="xl:text-xl md:text-base text-sm font-semibold flex gap-4 items-center">
                  <p className="max-w-32 text-wrap overflow-x-scroll">
                     {_props.title}
                  </p>
                  <div
                     className="h-full flex items-center justify-center hover:cursor-pointer"
                     onClick={() => _props.setFormMode('update')}
                  >
                     <LucidePencil
                        className="w-5 h-5"
                        onClick={() => {
                           _props.setFormMetadata(updateTaskFormMetadata);
                           _props.setFormValues({
                              id: _props.id,
                              title: _props.title,
                              authorEmail: userState.email,
                           });
                        }}
                     />
                  </div>
               </div>
               <div className="lg:text-sm text-xs">
                  <p>{new Date(_props.createdAt).toDateString()}</p>
               </div>
            </div>
            <div className="flex items-start justify-between  gap-4 ">
               <div className=" hover:cursor-pointer" onClick={deletee}>
                  <LucideTrash className="h-10 w-8 " />
               </div>
               <div
                  className="flex items-center hover:cursor-pointer"
                  onClick={mark}
               >
                  {_props.markedDone ? (
                     <LucideBadgeCheck className="h-10 w-8 " />
                  ) : (
                     <LucideBadge className="h-10 w-8 " />
                  )}
               </div>
            </div>
         </div>
      </div>
   );
}
