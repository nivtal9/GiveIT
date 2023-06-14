import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { setNewItem } from 'src/app/store/createItemPage/createItemActions';
import { ICategory } from 'src/interfaces/ICategory';
import { ILocation } from 'src/interfaces/ILocation';
import { IState } from 'src/interfaces/IState';
import { IStatus } from 'src/interfaces/IStatus';
import { ISubCategory } from 'src/interfaces/ISubCategory';
import { IUser } from 'src/interfaces/IUser';
import { IImage } from 'src/interfaces/IImage';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-ad-page',
  templateUrl: './create-ad-page.component.html',
  styleUrls: ['./create-ad-page.component.scss'],
})
export class CreateAdPageComponent implements OnInit {
  form!: FormGroup;
  itemData: FormData = new FormData();
  statuses$: Observable<IStatus[]>;
  locations$: Observable<ILocation[]>;
  categories$: Observable<ICategory[]>;
  subCategories$: Observable<ISubCategory[]>;
  user$: Observable<IUser>;
  user!: IUser;
  selectedCategory: ICategory = {} as ICategory;
  files: File[] = [];
  storedImages: IImage[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private store: Store<IState>,
    private router: Router
  ) {
    this.statuses$ = this.store.select(
      (state) => state.homePageReducer.statuses
    );
    this.locations$ = this.store.select(
      (state) => state.homePageReducer.locations
    );
    this.categories$ = this.store.select(
      (state) => state.homePageReducer.categories
    );
    this.subCategories$ = this.store.select(
      (state) => state.homePageReducer.subCategories
    );
    this.user$ = this.store.select((state) => state.authenticationReducer.user);
  }

  ngOnInit() {
    this.user$.subscribe((activeUser) => (this.user = activeUser));
    this.form = this.formBuilder.group({
      name: [
        '',
        [Validators.required, Validators.minLength(2)],
        Validators.maxLength(50),
      ],
      details: [
        '',
        [Validators.required, Validators.minLength(2)],
        Validators.maxLength(200),
      ],
      category: ['', Validators.required],
      subCategory: ['', Validators.required],
      status: ['', Validators.required],
      location: ['', Validators.required],
      width: [
        '',
        [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)],
      ],
      height: [
        '',
        [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)],
      ],
      length: [
        '',
        [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)],
      ],
    });
  }

  onSubmit() {
    const form = this.form.value;
    this.files.forEach((file) => this.itemData.append(`file`, file));
    this.itemData.append('name', form.name);
    this.itemData.append('subCategory', form.subCategory);
    this.itemData.append('height', form.height);
    this.itemData.append('length', form.length);
    this.itemData.append('width', form.width);
    this.itemData.append('status', form.status);
    this.itemData.append('details', form.details);
    this.itemData.append('location', form.location);
    this.itemData.append('user', this.user.username);
    this.store.dispatch(setNewItem({ item: this.itemData }));
    Swal.fire({
      icon: 'success',
      title: "Successfully Created",
    });
    this.router.navigate(['/main-page-components']);
  }
  onCategoryChange(category: ICategory) {
    this.selectedCategory = category;
  }

  onSelect(event: any) {
    this.files.push(...event.addedFiles);
  }

  onRemove(event: any) {
    this.files.splice(this.files.indexOf(event), 1);
  }
}
