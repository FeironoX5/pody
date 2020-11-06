import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFireStorage} from '@angular/fire/storage';
import {AngularFirestore} from 'angularfire2/firestore';
import {PlayerService} from '../player.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import * as firebase from 'firebase';

@Component({
  selector: 'app-other-user',
  templateUrl: './other-user.component.html',
  styleUrls: ['./other-user.component.css']
})
export class OtherUserComponent implements OnInit {
  public podcasts: Observable<any[]>;
  useremail: string;


  constructor(private readonly storage: AngularFireStorage,
              db: AngularFirestore, private player: PlayerService, private route: ActivatedRoute, private snackBar: MatSnackBar) {
    this.useremail = this.route.snapshot.paramMap.get('user');
    this.podcasts = db.collection('/podcasts').valueChanges();

  }

  ngOnInit(): void {
  }

  play(tracktitle, trackid) {
    this.player.play(tracktitle, trackid);
  }

  getName() {
    const name = this.useremail.toUpperCase();
    const i = name.indexOf('@');
    return name.slice(0, i);
  }
}
