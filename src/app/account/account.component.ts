import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFirestore} from 'angularfire2/firestore';
import {PlayerService} from '../player.service';
import * as firebase from 'firebase';
import {Router} from '@angular/router';
import {finalize} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AngularFireStorage} from '@angular/fire/storage';
import {async} from '@angular/core/testing';

@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
    edit = false;
    public podcasts: Observable<any[]>;
    password: string;
    imageurl = this.getUser().photoURL;
    displayname = this.getUser().displayName;


    constructor(private readonly storage: AngularFireStorage,
                db: AngularFirestore, private player: PlayerService, private router: Router, private snackBar: MatSnackBar) {
        this.podcasts = db.collection('/podcasts').valueChanges();

    }

    ngOnInit(): void {
    }

    play(tracktitle, trackid) {
        this.player.play(tracktitle, trackid);
    }

    getUser() {
        return firebase.auth().currentUser;
    }

    logOut() {
        firebase.auth().signOut();
        this.router.navigateByUrl('/signin');
    }

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }
    updateImageAndName() {
        this.getUser().updateProfile({displayName: this.displayname, photoURL: this.imageurl})
            .then(value => {
                this.snackBar.open('Saved!', 'OK', {
                    duration: 1000,
                });
            })
            .catch(error => {
                this.snackBar.open(error, 'OK', {
                    duration: 3000,
                });
            });
    }
    updatePassword() {
        this.getUser().updatePassword(this.password)
            .then(value => {
                this.snackBar.open('Saved!', 'OK', {
                    duration: 1000,
                });
            })
            .catch(error => {
                this.snackBar.open(error, 'OK', {
                    duration: 3000,
                });
            });
    }
}
