import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  menuHidden = false;

  constructor() {}

  setMenuHidden(hidden: boolean) {
    this.menuHidden = hidden;
  }

  isMenuHidden() {
    return this.menuHidden;
  }
}
