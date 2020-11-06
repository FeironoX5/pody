import { Injectable } from '@angular/core';
import {storage} from 'firebase';

@Injectable({
  providedIn: 'root'
})

export class PlayerService {
  title = '';
  constructor() { }
  play(tracktitle, trackid) {
    document.getElementById('playerx').style.display = 'block';
    this.title = tracktitle;
    storage().ref().child('Podcasts/').child('Track/').child(String(trackid)).getDownloadURL().then(function(urln) {
      console.log(urln);
      url = urln;
    });
  }
}
export let url = 'zero';
