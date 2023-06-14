import { IItem } from "./IItem";

export interface IUser {
  id:number;
  username: string;
  token: string;
  fullName:string,
  phoneNumber:string,
  email:string,
  favoriteItems?:IItem[];
}
