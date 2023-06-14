import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent {
  isModalOpen = false;
  @Output() onSignInClick = new EventEmitter<boolean>();

  onLoginClick(){
    this.onSignInClick.emit(true);
  }

  closeSignInModal(){
    this.isModalOpen = false;
  }

}
