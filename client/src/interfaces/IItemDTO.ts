import { ICategory } from './ICategory';
import { IImage } from './IImage';
import { ILocation } from './ILocation';
import { ISubCategory } from './ISubCategory';
import { IStatus } from './IStatus';
import { IUser } from './IUser';

export interface IItemDTO {
  id: number;
  name: string;
  category: ICategory;
  subCategory: ISubCategory;
  images: IImage[];
  height: number;
  length: number;
  width: number;
  creationDate: Date;
  status: IStatus;
  details: string;
  location: ILocation;
  user: IUser;
}
