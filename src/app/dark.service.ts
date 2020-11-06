import {Injectable, OnInit} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DarkService {
  dark = false;

  constructor() {
    this.dark = localStorage.getItem('dark_mode') === 'true';
    this.setTheme();
  }
  setTheme() {
    if (this.dark) {
      // @ts-ignore
      document.documentElement.style.setProperty('--text-color', 'black');
      // @ts-ignore
      document.documentElement.style.setProperty('--bg-color', 'white');
      // @ts-ignore
      document.documentElement.style.setProperty('--grey-color', '#F2F4F8');
    } else {
      // @ts-ignore
      document.documentElement.style.setProperty('--text-color', 'white');
      // @ts-ignore
      document.documentElement.style.setProperty('--bg-color', 'black');
      // @ts-ignore
      document.documentElement.style.setProperty('--grey-color', '#323131');
    }

  }
  changeTheme() {
    this.dark = !this.dark;
    localStorage.setItem('dark_mode', String(this.dark));
    this.setTheme();
  }
}
