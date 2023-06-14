import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  deleteUserItem,
  getUserItems,
  updateUserItem,
} from 'src/app/store/profilePage/profilePageActions';
import { IItem } from 'src/interfaces/IItem';
import { IState } from 'src/interfaces/IState';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-items',
  templateUrl: './edit-items.component.html',
  styleUrls: ['./edit-items.component.scss'],
})
export class EditItemsComponent {
  items$: Observable<IItem[]>
  form: FormGroup;
  userId!: number
  itemIndex: number = 0;

  constructor(private formBuilder: FormBuilder, private _store: Store<IState>, private router: Router) {
    this.items$ = this._store.select((state) => state.profilePageReducer.items)
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      details: ['', [Validators.required, Validators.maxLength(200)]],
      width: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      height: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      length: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
    });
  }

  ngOnInit() {
    this.userId = JSON.parse(sessionStorage.getItem('token') || '[]')?.id;
    this._store.dispatch(getUserItems({ userId: this.userId }));
  }

  onSubmit(currentItem: IItem) {
    let itemData: FormData = new FormData();
    const form = this.form.value;
    itemData.append('name', form.name)
    itemData.append('details', form.details)
    itemData.append('width', form.width)
    itemData.append('height', form.height)
    itemData.append('length', form.length)
    this._store.dispatch(updateUserItem({ itemId: currentItem.id, formData: itemData }))
    Swal.fire({
      icon: 'success',
      title: "Successfully Updated",
    });
    this.router.navigate(['/main-page-components']);
  }

  moveCard(moveDirection: boolean) {
    moveDirection ? this.itemIndex++ : this.itemIndex--;
  }
  deleteItem(item: IItem) {
    this._store.dispatch(deleteUserItem({ itemId: item.id }));
    this.router.navigate(['/main-page-components']);
    Swal.fire({
      icon: 'success',
      title: "Successfully Deleted",
    });
  }
}
