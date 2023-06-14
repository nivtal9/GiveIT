import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { isLoggedIn, loginUser, loginUserSuccess } from 'src/app/store/authentication/authenticationActions';
import { setItemsByFilter } from 'src/app/store/homePage/homepageActions';
import { ICategory } from 'src/interfaces/ICategory';
import { IFilterObject } from 'src/interfaces/IFilterObject';
import { IState } from 'src/interfaces/IState';
import { ISubCategory } from 'src/interfaces/ISubCategory';
import { IUser } from 'src/interfaces/IUser';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  categories$: Observable<ICategory[]>;
  filters$: Observable<IFilterObject>;
  isModalOpen = false;
  toggleFavorite = false;
  isFavoriteVisible = false;
  badgeCounter: number;
  @Output() onSignInClick = new EventEmitter<boolean>();
  isLoggedIn$: Observable<boolean>;
  user!:boolean;
  isUserIn!:boolean;
  userToken: IUser[] | [] = [];
  emptyUser = {} as IUser;
  
  constructor(private store: Store<IState>,private router: Router) {
    this.badgeCounter = 0;
    this.isLoggedIn$ = this.store.select((state) => state.authenticationReducer.isUserIn);
    this.categories$ = this.store.select((state) => state.homePageReducer.categories);
    this.filters$ = this.store.select((state) => state.homePageReducer.filterObject)
  }
  
  onLoginClick() {
    this.onSignInClick.emit(true);
  }

  closeSignInModal() {
    this.isModalOpen = false;
  }

  onFavoriteClick() {
    this.isFavoriteVisible = true;
    this.toggleFavorite = !this.toggleFavorite;
  }  

  logout(){
    sessionStorage.removeItem('token');
    this.store.dispatch(loginUserSuccess({user:this.emptyUser}));
    this.store.dispatch(isLoggedIn());
    this.router.navigate(['/main-page-components'])
    window.location.reload();
  }

  checkUser(){
    this.userToken = JSON.parse(sessionStorage.getItem('token') || '[]');
    if(sessionStorage.getItem('token') != null && this.userToken.length != 0){
      this.isUserIn = true;
      this.router.navigate(['/create-ad-page-components'])
    }
    else{
      this.isModalOpen = !this.isModalOpen; 
      this.isUserIn = false;
    }
  }

  filterSubCategory(subCategory: ISubCategory) {
    let filter!: IFilterObject;
    this.filters$.subscribe(res => filter = res);
    const filterObject: IFilterObject = {
      SubCategory: subCategory,
      SearchInput: filter.SearchInput,
      Location: filter.Location,
      ItemStatus: filter.ItemStatus
    }
    this.store.dispatch(setItemsByFilter({ filterObject }))
  }
}
