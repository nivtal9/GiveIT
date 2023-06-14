import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IItem } from 'src/interfaces/IItem';
import { IUser } from 'src/interfaces/IUser';
import { UserInfoComponent } from '../user-info/user-info.component';

@Component({
  selector: 'app-single-item-modal',
  templateUrl: './single-item-modal.component.html',
  styleUrls: ['./single-item-modal.component.scss'],
})
export class SingleItemModalComponent {
  @Output() onCloseModal = new EventEmitter();
  @Input() valueFromItemCard = <IItem>{};
  imageNumber: number = 0;
  constructor(public dialog: MatDialog) {}

  closeSignInModal() {
    this.onCloseModal.emit();
  }

  openDialog(): void {
    this.dialog.open(UserInfoComponent, {
      data: {
        username: this.valueFromItemCard.user.username,
        fullName: this.valueFromItemCard.user.fullName,
        phoneNumber: this.valueFromItemCard.user.phoneNumber,
        email: this.valueFromItemCard.user.email,
      },
    });
  }
  nextImage() {
    if (this.imageNumber < this.valueFromItemCard.images.length - 1) {
      this.imageNumber++;
    }
  }
  previousImage() {
    if (this.imageNumber > 0) {
      this.imageNumber--;
    }
  }
}
