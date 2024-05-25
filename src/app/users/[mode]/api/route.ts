import { TRegisterUserDTO } from '@/DTO/users/index.dto';
import { globalConst } from '@/constants';
import { prisma } from '@/prisma/prisma';
import { TResponse } from '@/types';
import { ApiAsyncRunner } from '@/utils/asyncRunner';
import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server';

export function GET(req: NextRequest) {
   return new ApiAsyncRunner({
      callbackProps: req,
      callback: async (req: NextRequest) => {
         let response: TResponse;

         const reqMode = req.url.split('/')[req.url.split('/').length - 2];
         const reqParams = req.nextUrl.searchParams;
         const userId = Number(reqParams.get('userId'));

         if (reqMode !== 'profile') {
            redirect('/not-found');
         }

         const user = await prisma.user.findFirst({
            where: {
               id: userId,
            },
         });

         console.log({ user });
         response = {
            isSuccess: true,
            msg: '',
            data: user,
         };
         return Response.json(response);
      },
      errorMessage: globalConst.genericErrorMessage,
   }).execute();
}

export function POST(req: NextRequest) {
   return new ApiAsyncRunner({
      callbackProps: req,
      callback: async (req: NextRequest) => {
         let response: TResponse;

         const reqMode = req.url.split('/')[req.url.split('/').length - 2];
         const reqParams = req.nextUrl.searchParams;
         const userId = Number(reqParams.get('userId'));

         if (reqMode === 'register') {
            const data: TRegisterUserDTO = await req.json();

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
            return Response.json(response);
         }
      },
      errorMessage: globalConst.genericErrorMessage,
   }).execute();
}
