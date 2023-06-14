import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  setStatuses,
  setLocations,
  setCategories,
  setSubCategories,
  setItemsByFilter,
} from 'src/app/store/homePage/homepageActions';
import { IState } from 'src/interfaces/IState';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'GiveIt';
  constructor(private store: Store<IState>) {}
  ngOnInit() {
    this.store.dispatch(setStatuses());
    this.store.dispatch(setLocations());
    this.store.dispatch(setCategories());
    this.store.dispatch(setSubCategories());
    sessionStorage.clear()
  }
}
