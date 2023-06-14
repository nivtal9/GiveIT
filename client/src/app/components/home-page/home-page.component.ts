import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { setItemsByFilter } from 'src/app/store/homePage/homepageActions';
import { IItem } from 'src/interfaces/IItem';
import { IState } from 'src/interfaces/IState';
import { IUser } from 'src/interfaces/IUser';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent{
  items$: Observable<IItem[]>;

  constructor(private store: Store<IState>) {
    this.items$ = this.store.select((state) => state.homePageReducer.items);
  }

  ngOnInit(){
    this.store.dispatch(setItemsByFilter({ filterObject: null }));
  }
}

 



