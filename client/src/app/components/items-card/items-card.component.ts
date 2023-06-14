import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastService } from 'angular-toastify';
import { Observable } from 'rxjs';
import { loginUser, setNewUser, setNewUserSuccess } from 'src/app/store/authentication/authenticationActions';
import { getUserFavoriteItems, setFavorites } from 'src/app/store/favoritesPage/favoritesActions';
import { IFavorite } from 'src/interfaces/IFavorite';
import { IItem } from 'src/interfaces/IItem';
import { IState } from 'src/interfaces/IState';
import { IUser } from 'src/interfaces/IUser';

@Component({
  selector: 'app-items-card',
  templateUrl: './items-card.component.html',
  styleUrls: ['./items-card.component.scss'],
})
export class ItemsCardComponent{
  @Input() itemIntoCards!:IItem[] | null;
  valueToItemModal = <IItem>{};
  
  isModalOpen = false;
  isFavorite = false;
  favorite!: IFavorite;
  user!: IUser;
  favorite$: Observable<IFavorite>;
  user$: Observable<IUser>;

  isLoggedIn!:boolean;
  isModalSignInOpen = false;
  @Output() onSignInClick = new EventEmitter<boolean>();
  userToken: IUser[] | [] = [];

  constructor(private _toastService: ToastService,private router: Router,private store: Store<IState>) {
    this.favorite$ = this.store.select((state) => state.favoritesReducer.favorites);
    this.user$ = this.store.select((state) => state.authenticationReducer.user);
   }
  
   ngOnInit() {
    this.favorite$.subscribe((favoriteItem) => (this.favorite = favoriteItem));
    this.user$.subscribe((activeUser) => (this.user = activeUser));
  }

  onLoginClick(){
    this.onSignInClick.emit(true);
  }

  closeSignInModal(){
    this.isModalSignInOpen = false;
  }

  showItemModal(itemId: number,singleItem:IItem) {
    this.isModalOpen=true;
    this.valueToItemModal = singleItem;
  }

  closeItemModal() {
    this.isModalOpen = false;
  }
  
  addToFavorite(item:IItem, event:any){
    event.stopPropagation();
    this.isFavorite = !this.isFavorite;
    event.target.classList.toggle('fullHeart');

    this.userToken = JSON.parse(sessionStorage.getItem('token') || '[]');

    if(sessionStorage.getItem('token')!=null && this.userToken.length != 0){

      if(this.isFavorite){
        var favoriteItem: IFavorite = {
          itemId:item.id,
          userId: this.user.id,
        };
        this.store.dispatch(setFavorites({ favorites: favoriteItem }));
      }   
      this.isLoggedIn = true;
      this._toastService.info('Saved to favorites!');  
      this.store.dispatch(getUserFavoriteItems({ userId: this.user.id }));
      this.router.navigate(['/home-page-components']);
    }
    else{
      event.target.classList.toggle('emptyHeart');
      this._toastService.info('Removed from favorites!');
      this.isLoggedIn = false;
      this.isModalSignInOpen = !this.isModalSignInOpen;
    }
  }
}
