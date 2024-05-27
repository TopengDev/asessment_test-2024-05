import { Dispatch, MutableRefObject, SetStateAction } from 'react';
import { TaskItem } from './TaskItem';
import { TFormMetadata } from '../FormComponent/test';

export type TTaskItem = {
   createdAt: Date;
   markedDone: boolean;
   title: string;
   desc: string;
   id: string;
   setFormMetadata: Dispatch<SetStateAction<TFormMetadata<any>>>;
   formValues: any;
   setFormValues: Dispatch<SetStateAction<any>>;
};
type TTaskListProps = {
   title: string;
   dataList: TTaskItem[];
   refetch: (props?: any) => any;
   setFormMode: Dispatch<SetStateAction<any>>;
   setFormMetadata: Dispatch<SetStateAction<TFormMetadata<any>>>;
   formValues: any;
   setFormValues: Dispatch<SetStateAction<any>>;
};
export function TaskList(_props: TTaskListProps) {
   return (
      <div className="w-full flex flex-col gap-2 h-1/2 ">
         <div className="w-full py-4 ">
            <h3 className="font-bold xl:text-2xl md:text-lg text-base">
               {_props.title}
            </h3>
         </div>
         <div className="overflow-hidden w-full flex flex-col gap-2 overflow-y-scroll h-full">
            {_props.dataList.map((task, i) => {
               return (
                  <TaskItem
                     {...task}
                     refetch={_props.refetch}
                     setFormMode={_props.setFormMode}
                     key={i}
                     setFormMetadata={_props.setFormMetadata}
                     setFormValues={_props.setFormValues}
                  />
               );
            })}
         </div>
      </div>
   );
}
