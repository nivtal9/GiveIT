import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  deleteNotification,
  setNewNotification,
} from 'src/app/store/notificationPage/notificationActions';

import { ICategory } from 'src/interfaces/ICategory';
import { INotification } from 'src/interfaces/INotification';
import { IState } from 'src/interfaces/IState';
import { ISubCategory } from 'src/interfaces/ISubCategory';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-notification-page',
  templateUrl: './notification-page.component.html',
  styleUrls: ['./notification-page.component.scss'],
})
export class NotificationPageComponent {
  createForm!: FormGroup;
  deleteForm!: FormGroup;
  categories$: Observable<ICategory[]>;
  subCategories$: Observable<ISubCategory[]>;
  selectedCategory: ICategory = {} as ICategory;

  constructor(private formBuilder: FormBuilder, private store: Store<IState>,private router: Router) {
    this.categories$ = this.store.select(
      (state) => state.homePageReducer.categories
    );
    this.subCategories$ = this.store.select(
      (state) => state.homePageReducer.subCategories
    );
  }

  ngOnInit() {
    this.createForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      category: ['', Validators.required],
      subCategory: ['', Validators.required],
    });
    this.deleteForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      category: ['', Validators.required],
      subCategory: ['', Validators.required],
    });
  }

  onCategoryChange(category: ICategory) {
    this.selectedCategory = category;
  }
  createNotification() {
    const form = this.createForm.value;
    var notification: INotification = {
      subCategoryId: form.subCategory,
      email: form.email,
    };
    this.store.dispatch(setNewNotification({ notification: notification }));
    Swal.fire({
      icon: 'success',
      title: "Successfully Subscribed",
    });
    this.router.navigate(['/notification-page-components']);

  }
  deleteNotification() {
    const form = this.deleteForm.value;
    var notification: INotification = {
      subCategoryId: form.subCategory,
      email: form.email,
    };
    this.store.dispatch(deleteNotification({ notification: notification }));
    Swal.fire({
      icon: 'success',
      title: "Successfully Unsubscribed",
    });
    this.router.navigate(['/notification-page-components']);
  }
}
