import { ISubCategory } from "./ISubCategory";

export interface ICategory {
  id: number;
  name?: string;
  subCategories?: ISubCategory[];
}

