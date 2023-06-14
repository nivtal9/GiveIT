import { ILocation } from "./ILocation";
import { IStatus } from "./IStatus";
import { ISubCategory } from "./ISubCategory";

export interface IFilterObject {
    SubCategory: ISubCategory | null
    SearchInput: string;
    ItemStatus: IStatus[];
    Location: ILocation[];
}