import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PodcastsService {
  loading = true;
  public items: Observable<any[]>;

  constructor(db: AngularFirestore) {
    this.items = db.collection('/podcasts').valueChanges();
  }
}
