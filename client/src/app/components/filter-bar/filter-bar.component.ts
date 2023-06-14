import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { setItemsByFilter } from 'src/app/store/homePage/homepageActions';
import { IFilterObject } from 'src/interfaces/IFilterObject';
import { ILocation } from 'src/interfaces/ILocation';
import { debounceTime } from 'rxjs/operators';
import { IState } from 'src/interfaces/IState';
import { IStatus } from 'src/interfaces/IStatus';
import { ISubCategory } from 'src/interfaces/ISubCategory';
import { onFilter } from 'src/app/Utils/Utils';

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.scss'],
})
export class FilterBarComponent {
  form: FormGroup;
  filters$: Observable<IFilterObject>;
  statuses$: Observable<IStatus[]>;
  locations$: Observable<ILocation[]>;
  subCategory!: ISubCategory | null

  constructor(private formBuilder: FormBuilder, private store: Store<IState>) {
    this.form = this.formBuilder.group({
      location: new FormControl([]),
      condition: new FormControl([]),
      search: new FormControl(''),
    });
    this.statuses$ = this.store.select((state) => state.homePageReducer.statuses);
    this.locations$ = this.store.select((state) => state.homePageReducer.locations);
    this.filters$ = this.store.select((state) => state.homePageReducer.filterObject);
  }

  ngOnInit() {
    this.filters$.subscribe(res => this.subCategory = res.SubCategory)
    this.form.get('search')?.valueChanges.pipe(debounceTime(1000)).subscribe(res =>
      this.store.dispatch(setItemsByFilter({ filterObject: onFilter(this.form.value, this.subCategory!) })))
    this.form.get('location')?.valueChanges.pipe(debounceTime(0)).subscribe(res =>
      this.store.dispatch(setItemsByFilter({ filterObject: onFilter(this.form.value, this.subCategory!) })))
    this.form.get('condition')?.valueChanges.pipe(debounceTime(0)).subscribe(res =>
      this.store.dispatch(setItemsByFilter({ filterObject: onFilter(this.form.value, this.subCategory!) })))
  }

  clearLocation() {
    this.form.controls['location'].setValue([])
    this.store.dispatch(setItemsByFilter({ filterObject: onFilter(this.form.value, this.subCategory!) }))
  }

  clearStatus() {
    this.form.controls['condition'].setValue([])
    this.store.dispatch(setItemsByFilter({ filterObject: onFilter(this.form.value, this.subCategory!) }))
  }

  clearSubCategory() {
    this.subCategory = null;
    this.store.dispatch(setItemsByFilter({ filterObject: onFilter(this.form.value, this.subCategory!) }))
  }
}
