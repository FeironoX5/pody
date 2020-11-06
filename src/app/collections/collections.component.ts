import { Component, OnInit } from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import {AngularFireStorage} from '@angular/fire/storage';
import {PlayerService} from '../player.service';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.css']
})
export class CollectionsComponent implements OnInit {
  public collections: Observable<any[]>;

  constructor(private db: AngularFirestore, private storage: AngularFireStorage, private player: PlayerService, private route: ActivatedRoute) {
    this.collections = db.collection('/collections').valueChanges({idField: 'id'});

  }

  ngOnInit(): void {
  }

}
