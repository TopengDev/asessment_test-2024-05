'use client';

import useForm, { FormProvider, Form } from '@/components/FormComponent/test';
import { addTaskFormMetadata } from './form-metadata';
import { TTaskItem, TaskList } from '@/components/Tasklist';
import { useEffect, useState } from 'react';
import { TTaskListFilter } from '@/DTO/tasks/index.dto';
import useGlobalContext from '../global.provider';
import { HorizontalSwitch } from '@/components/horizontal-switch';

function TasksPage() {
   const { userState } = useGlobalContext();

   const { submit, formMetadata, formValues, setFormValues, setFormMetadata } =
      useForm();

   const [markedTaskList, setMarkedTaskList] = useState<TTaskItem[]>([]);
   const [unmarkedTaskList, setUnmarkedTaskList] = useState<TTaskItem[]>([]);

   const getTaskList = async () => {
      try {
         const res = await (
            await fetch('http://localhost:3000/tasks/list/api', {
               method: 'POST',
               body: JSON.stringify({
                  limit: 100,
                  page: 1,
                  authorEmail: userState.email,
                  orderBy: orderBy === 1 ? 'newest' : 'oldest',
               } as TTaskListFilter),
            })
         ).json();

         setMarkedTaskList(
            res.data.filter((task: TTaskItem) => task.markedDone),
         );
         setUnmarkedTaskList(
            res.data.filter((task: TTaskItem) => !task.markedDone),
         );
      } catch (e: any) {}
   };

   const [orderBy, setOrderBy] = useState<number>(1);

   useEffect(() => {
      setUnmarkedTaskList(
         unmarkedTaskList.sort((curr, next) =>
            orderBy !== 1
               ? new Date(next.createdAt).getTime() -
                 new Date(curr.createdAt).getTime()
               : new Date(curr.createdAt).getTime() -
                 new Date(next.createdAt).getTime(),
         ),
      );
      setMarkedTaskList(
         markedTaskList.sort((curr, next) =>
            orderBy !== 1
               ? new Date(next.createdAt).getTime() -
                 new Date(curr.createdAt).getTime()
               : new Date(curr.createdAt).getTime() -
                 new Date(next.createdAt).getTime(),
         ),
      );
   }, [orderBy]);

   const [formMode, setFormMode] = useState<'add' | 'update'>('add');

   return (
      <section className="xy-centered-view-container">
         <div className="xl:w-[33.3vw] xl:h-[75vh] md:w-[45vw] md:h-[60vh] h-[60vh] w-[65vw] border-black border-solid border-2 p-16 flex items-center justify-center flex-col gap-8">
            <div className="flex flex-col  w-full items-center gap-12 ">
               <div>
                  <h2 className="xl:text-4xl md:text-3xl text-2xl">
                     Task Management
                  </h2>
               </div>
               <div className="w-full flex">
                  <Form
                     formFields={[
                        ...formMetadata.formFields,
                        {
                           field: 'authorEmail',
                           type: 'string',
                           isHiddenField: true,
                           value: userState.email,
                        },
                     ]}
                     formValues={formValues}
                     setFormValues={setFormValues}
                     colMode="row"
                  />
               </div>
               <div className="">
                  {formMode === 'add' ? (
                     <button
                        className="bg-[#6FCBFF] flex justify-center items-center p-4 rounded-xl hover:bg-sky-200 transition-all duration-150"
                        onClick={() =>
                           submit(formMetadata, formValues, getTaskList)
                        }
                     >
                        Add Task
                     </button>
                  ) : (
                     <div className="flex justify-between items-center gap-4">
                        <div className="flex items-center justify-between gap-4">
                           <button
                              className="bg-[#6FCBFF] flex justify-center items-center p-4 rounded-xl hover:bg-sky-200 transition-all duration-150"
                              onClick={() => {
                                 submit(
                                    formMetadata,
                                    formValues,
                                    getTaskList,
                                 ).then(() => {
                                    setFormMetadata(addTaskFormMetadata);
                                    setFormMode('add');
                                 });
                                 setFormValues({
                                    ...formValues,
                                    id: undefined,
                                    title: '',
                                 });
                              }}
                           >
                              Update Task
                           </button>
                        </div>
                        <div className="flex items-center justify-between gap-4">
                           <button
                              className="bg-[#6FCBFF] flex justify-center items-center p-4 rounded-xl hover:bg-sky-200 transition-all duration-150"
                              onClick={() => {
                                 setFormMode('add');
                                 setFormMetadata(addTaskFormMetadata);
                                 setFormValues({
                                    ...formValues,
                                    id: undefined,
                                    title: '',
                                 });
                              }}
                           >
                              Cancel
                           </button>
                        </div>
                     </div>
                  )}
               </div>
            </div>
            <div>
               <HorizontalSwitch
                  activeState={orderBy}
                  setActiveState={setOrderBy}
                  itemList={[
                     {
                        id: 1,
                        title: 'newest',
                        // onChoice: getTaskList,
                     },
                     {
                        id: 2,
                        title: 'oldest',
                        // onChoice: getTaskList,
                     },
                  ]}
               />
            </div>
            <div className="w-full flex flex-col gap-8 h-1/2 ">
               <TaskList
                  title="Ongoing Tasks"
                  dataList={unmarkedTaskList}
                  refetch={getTaskList}
                  setFormMode={setFormMode}
                  setFormMetadata={setFormMetadata}
                  formValues={formValues}
                  setFormValues={setFormValues}
               />
               <TaskList
                  title="Completed Task"
                  dataList={markedTaskList}
                  refetch={getTaskList}
                  setFormMode={setFormMode}
                  setFormMetadata={setFormMetadata}
                  formValues={formValues}
                  setFormValues={setFormValues}
               />
            </div>
         </div>
      </section>
   );
}

export default function Page() {
   const { userState } = useGlobalContext();
   return (
      <FormProvider initialFormMetadata={addTaskFormMetadata}>
         <TasksPage />;
      </FormProvider>
   );
}
