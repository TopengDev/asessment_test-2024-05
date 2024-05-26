export type TRegisterUserDTO = {
   email: string;
   password: string;
   fullName: string;
};
export const initialRegisterUserDTO: TRegisterUserDTO = {
   email: '',
   password: '',
   fullName: '',
};
export type TLoginUserDTO = {
   email: string;
   password: string;
};
export const initialLoginUserDTO: TLoginUserDTO = {
   email: '',
   password: '',
};
export type TProfileUserDTO = {
   email: string;
};
export const initialProfileUserDTO: TProfileUserDTO = {
   email: '',
};
export type TDeleteUserDTO = TProfileUserDTO;
export const initialDeleteUserDTO: TDeleteUserDTO = {
   email: '',
};
