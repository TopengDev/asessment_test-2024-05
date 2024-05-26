import {
   TDeleteUserDTO,
   TLoginUserDTO,
   TProfileUserDTO,
   TRegisterUserDTO,
   initialLoginUserDTO,
   initialProfileUserDTO,
   initialRegisterUserDTO,
} from '@/DTO/users/index.dto';
import { globalConst } from '@/constants';
import { prisma } from '@/prisma/prisma';
import { TResponse } from '@/types';
import { ApiAsyncRunner } from '@/utils/asyncRunner';
import { validateFields } from '@/utils/fieldsValidator';
import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server';

export function GET(req: NextRequest) {
   let errorMessage: string = '';
   return new ApiAsyncRunner({
      callbackProps: req,
      callback: async (req: NextRequest) => {
         errorMessage = 'User not found';

         let response: TResponse;

         const reqMode = req.url.split('/')[req.url.split('/').length - 2];
         const reqParams = req.nextUrl.searchParams;
         const email = reqParams.get('email') || '';

         if (reqMode !== 'profile') {
            redirect('/not-found');
         }

         const user = await prisma.user.findFirst({
            where: {
               email,
            },
         });

         response = {
            isSuccess: true,
            msg: '',
            data: user,
         };
         return Response.json(response);
      },
      errorMessage,
   }).execute();
}

export function POST(req: NextRequest) {
   let errorMessage: string = '';
   return new ApiAsyncRunner({
      callbackProps: req,
      callback: async (req: NextRequest) => {
         let response: TResponse;

         const reqMode = req.url.split('/')[req.url.split('/').length - 2];
         const reqParams = req.nextUrl.searchParams;

         if (reqMode === 'register') {
            errorMessage = 'Email already exists';

            const data: TRegisterUserDTO = await req.json();

            const validated = validateFields(initialRegisterUserDTO, data);

            if (validated.length) {
               response = {
                  isSuccess: false,
                  msg: `These fields are required [${validated.join(', ')}]`,
               };
               return Response.json(response, { status: 400 });
            }

            const newUser = await prisma.user.create({
               data: {
                  email: data.email,
                  fullName: data.fullName,
                  hashedPassword: data.password,
               },
            });
            response = {
               isSuccess: true,
               msg: globalConst.genericSuccessMessage,
               data: newUser,
            };
            return Response.json(response, {
               status: 201,
            });
         }

         if (reqMode === 'profile') {
            errorMessage = 'User not found';

            const data: TProfileUserDTO = await req.json();

            const validated = validateFields(initialProfileUserDTO, data);

            if (validated.length) {
               response = {
                  isSuccess: false,
                  msg: `These fields are required [${validated.join(', ')}]`,
               };
               return Response.json(response, { status: 400 });
            }

            const user = await prisma.user.findUnique({
               where: {
                  email: data.email,
               },
               select: {
                  email: true,
                  fullName: true,
               },
            });

            if (!user) {
               response = {
                  isSuccess: false,
                  msg: 'User not found',
               };
               return Response.json(response, {
                  status: 400,
               });
            }

            response = {
               isSuccess: true,
               msg: globalConst.genericSuccessMessage,
               data: user,
            };
            return Response.json(response, {
               status: 200,
            });
         }
         if (reqMode === 'login') {
            errorMessage = 'Invalid credentials';

            const data: TLoginUserDTO = await req.json();

            const validated = validateFields(initialProfileUserDTO, data);

            if (validated.length) {
               response = {
                  isSuccess: false,
                  msg: `These fields are required [${validated.join(', ')}]`,
               };
               return Response.json(response, { status: 400 });
            }

            const user = await prisma.user.findUnique({
               where: {
                  email: data.email,
                  hashedPassword: data.password,
               },
               select: {
                  email: true,
                  fullName: true,
               },
            });

            if (!user) {
               response = {
                  isSuccess: false,
                  msg: 'Invalid credentials',
               };
               return Response.json(response, {
                  status: 401,
               });
            }

            response = {
               isSuccess: true,
               msg: globalConst.genericSuccessMessage,
               data: user,
            };
            return Response.json(response, {
               status: 200,
            });
         }
         if (reqMode === 'delete') {
            errorMessage = 'User not found';

            const data: TDeleteUserDTO = await req.json();

            const validated = validateFields(initialProfileUserDTO, data);

            if (validated.length) {
               response = {
                  isSuccess: false,
                  msg: `These fields are required [${validated.join(', ')}]`,
               };
               return Response.json(response, { status: 400 });
            }

            const user = await prisma.user.delete({
               where: {
                  email: data.email,
               },
            });
            response = {
               isSuccess: true,
               msg: 'Account data successfully removed',
               data: user,
            };
            return Response.json(response, {
               status: 200,
            });
         }
      },
      errorMessage,
   }).execute();
}
