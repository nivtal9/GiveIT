import { FormGroup } from "@angular/forms"
import { IFilterObject } from "src/interfaces/IFilterObject";
import { ISubCategory } from "src/interfaces/ISubCategory"

export function onFilter(form: any, subCategory: ISubCategory | null) {
    console.log(form)
    const filterObject: IFilterObject = {
        SubCategory: subCategory,
        SearchInput: form.search,
        Location: form.location.length === 0 ? [] : [{ id: form.location }],
        ItemStatus: form.condition.map((id: number) => {
            return { id }
        })
    }
    return filterObject;
}