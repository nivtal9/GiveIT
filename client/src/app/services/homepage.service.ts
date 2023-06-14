import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IStatus } from 'src/interfaces/IStatus';
import { ILocation } from 'src/interfaces/ILocation';
import { IItem } from 'src/interfaces/IItem';
import { IFilterObject } from 'src/interfaces/IFilterObject';
import { ICategory } from 'src/interfaces/ICategory';
import { ISubCategory } from 'src/interfaces/ISubCategory';

@Injectable({
  providedIn: 'root',
})
export class homePageService {
  readonly ROOT_URL = 'https://localhost:5001/api';

  constructor(private http: HttpClient) { }

  getStatuses() {
    return this.http.get<IStatus[]>(this.ROOT_URL + '/Statuses');
  }

  getLocations() {
    return this.http.get<ILocation[]>(this.ROOT_URL + '/Locations');
  }

  getCategories() {
    return this.http.get<ICategory[]>(this.ROOT_URL + '/Categories');
  }

  getSubCategories() {
    return this.http.get<ISubCategory[]>(this.ROOT_URL + '/SubCategories');
  }

  setItemsByFilter(FilterObject: IFilterObject | null) {
    let params = new HttpParams()
    if (FilterObject?.Location[0]) {
      params = params.append('location', FilterObject.Location[0].id)
    }
    if (FilterObject?.SubCategory) {
      params = params.append('subCategory', FilterObject.SubCategory.id)
    }
    if (FilterObject?.SearchInput) {
      params = params.append('searchInput', FilterObject.SearchInput)
    }
    FilterObject?.ItemStatus?.forEach(status => params = params.append('StatusId', status.id))
    return this.http.get<IItem[]>(this.ROOT_URL + '/items/filter', { params });
  }
}