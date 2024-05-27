import {
   TAddTaskDTO,
   TDeleteTaskDTO,
   TMarkTaskDTO,
   TTaskListFilter,
   TUpdateTaskDto,
   initialAddTaskDTO,
   initialDeleteTaskDTO,
   initialMarkTaskDTO,
   initialTaskListFilterDTO,
   initialUpdateTaskDTO,
} from '@/DTO/tasks/index.dto';
import { globalConst } from '@/constants';
import { prisma } from '@/prisma/prisma';
import { TResponse } from '@/types';
import { ApiAsyncRunner } from '@/utils/asyncRunner';
import { CustomLogger } from '@/utils/customLogger';
import { validateFields } from '@/utils/fieldsValidator';
import { Prisma, Todo } from '@prisma/client';
import { NextRequest } from 'next/server';

export function POST(req: NextRequest) {
   let response: TResponse;
   let errorMessage: string = '';

   return new ApiAsyncRunner({
      callbackProps: req,
      callback: async (req: NextRequest) => {
         const apiLogger = new CustomLogger();
         const reqMode = req.url.split('/')[req.url.split('/').length - 2];
         const reqParams: any = req.nextUrl.searchParams;

         if (reqMode === 'list') {
            const reqData: TTaskListFilter = await req.json();

            apiLogger.logReq({
               req: {
                  data: reqData,
                  url: req.url,
                  params: req.nextUrl.searchParams,
               },
            });
            const filter: any = { ...initialTaskListFilterDTO, ...reqData };

            const generateFilterCondition = (filter: TTaskListFilter) => {
               const filterCondition: any = {
                  where: {
                     authorEmail: reqData.authorEmail,
                  },
                  orderBy: {},
               };
               filterCondition.take = filter.limit as number;
               filterCondition.skip =
                  ((filter.page as number) - 1) * (filter.limit as number);

               if (filter.markedDone) {
                  switch (filter.markedDone) {
                     case 'T':
                        filterCondition.where.markedDone = true;
                     case 'F':
                        filterCondition.where.markedDone = false;
                  }
               }

               if (filter.title) {
                  filterCondition.where = {
                     ...filterCondition.where,
                     title: {
                        contains: filter.title,
                        mode: 'insensitive',
                     },
                  };
               }
               if (filter.desc) {
                  filterCondition.where = {
                     ...filterCondition.where,
                     desc: { contains: filter.desc, mode: 'insensitive' },
                  };
               }

               return filterCondition;
            };

            let tasks = await prisma.todo.findMany(
               generateFilterCondition(filter),
            );

            if (filter.orderBy) {
               switch (filter.orderBy) {
                  case 'oldest':
                     tasks = tasks.sort(
                        (cur, next) =>
                           cur.createdAt.getTime() - next.createdAt.getTime(),
                     );
                  case 'newest':
                     tasks = tasks.sort(
                        (cur, next) =>
                           next.createdAt.getTime() - cur.createdAt.getTime(),
                     );
               }
            }

            response = {
               isSuccess: true,
               msg: globalConst.genericSuccessMessage,
               data: tasks,
            };
            apiLogger.logRes({ res: response });
            return Response.json(response);
         }

         if (reqMode === 'add') {
            errorMessage = 'Failed to add task';
            const reqData: TAddTaskDTO = await req.json();

            const validated = validateFields(initialAddTaskDTO, reqData);

            if (validated.length) {
               response = {
                  isSuccess: false,
                  msg: `These fields are required ${validated.join(',')}`,
               };
               return Response.json(response, { status: 400 });
            }

            const addedTask = await prisma.todo.create({
               data: { ...reqData, desc: '' },
            });

            if (!addedTask) {
               response = {
                  isSuccess: false,
                  msg: 'An error occured while adding task',
               };
               return Response.json(response, {
                  status: 400,
               });
            }

            response = {
               isSuccess: true,
               msg: globalConst.genericSuccessMessage,
               data: addedTask,
            };
            apiLogger.logRes({ res: response });
            return Response.json(response, {
               status: 201,
            });
         }

         if (reqMode === 'update') {
            errorMessage = 'Failed to update task';
            const reqData: TUpdateTaskDto = await req.json();

            const validated = validateFields(initialUpdateTaskDTO, reqData);

            if (validated.length) {
               response = {
                  isSuccess: false,
                  msg: `These fields are required ${validated.join(',')}`,
               };
               return Response.json(response, {
                  status: 400,
               });
            }

            const updatedTask = await prisma.todo.update({
               data: reqData,
               where: {
                  id: reqData.id,
               },
            });

            if (!updatedTask) {
               response = {
                  isSuccess: false,
                  msg: 'An error occured while updating task',
               };
               return Response.json(response, {
                  status: 400,
               });
            }

            response = {
               isSuccess: true,
               msg: globalConst.genericSuccessMessage,
               data: updatedTask,
            };
            apiLogger.logRes({ res: response });
            return Response.json(response);
         }

         if (reqMode === 'delete') {
            errorMessage = 'Failed to mark task';
            const reqData: TDeleteTaskDTO = await req.json();

            const validated = validateFields(initialDeleteTaskDTO, reqData);

            if (validated.length) {
               response = {
                  isSuccess: false,
                  msg: `These fields are required ${validated.join(',')}`,
               };
               return Response.json(response, { status: 400 });
            }

            const deletedTask = await prisma.todo.delete({
               where: {
                  id: reqData.id,
               },
            });

            if (!deletedTask) {
               response = {
                  isSuccess: false,
                  msg: 'An error occured while marking task',
               };
               return Response.json(response, {
                  status: 400,
               });
            }

            response = {
               isSuccess: true,
               msg: globalConst.genericSuccessMessage,
               data: deletedTask,
            };
            apiLogger.logRes({ res: response });
            return Response.json(response);
         }
         if (reqMode === 'mark') {
            errorMessage = 'Failed to mark task';
            const reqData: TMarkTaskDTO = await req.json();

            const validated = validateFields(initialMarkTaskDTO, reqData);

            if (validated.length) {
               response = {
                  isSuccess: false,
                  msg: `These fields are required ${validated.join(',')}`,
               };
               return Response.json(response, { status: 400 });
            }

            const task = await prisma.todo.findUnique({
               where: {
                  id: reqData.id,
               },
            });

            if (!task) {
               response = {
                  isSuccess: false,
                  msg: 'An error occured while marking task',
               };
               return Response.json(response, {
                  status: 400,
               });
            }

            const updatedTask = await prisma.todo.update({
               data: { ...task, markedDone: !task?.markedDone },
               where: {
                  id: reqData.id,
               },
            });

            if (!updatedTask) {
               response = {
                  isSuccess: false,
                  msg: 'An error occured while marking task',
               };
               return Response.json(response, {
                  status: 400,
               });
            }

            response = {
               isSuccess: true,
               msg: globalConst.genericSuccessMessage,
               data: updatedTask,
            };
            apiLogger.logRes({ res: response });
            return Response.json(response);
         }
      },
      errorMessage,
   }).execute();
}
