import {Component, OnInit} from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import {catchError, finalize, takeUntil} from 'rxjs/operators';
import {AngularFireStorage} from '@angular/fire/storage';
import {Observable} from 'rxjs';
import {AngularFirestore} from 'angularfire2/firestore';
import {MatSnackBar} from '@angular/material/snack-bar';
import * as firebase from 'firebase';

@Component({
    selector: 'app-add',
    templateUrl: './add.component.html',
    styleUrls: ['./add.component.css']
})
export class AddComponent {
    title: string;
    description: string;
    sdescription: string;
    trackid: number;
    imageid: number;
    selectedFile: File = null;
    fb;
    fbimage;
    downloadURL: Observable<string>;
    downloadImageURL: Observable<string>;
    type: any;
    tag: any;
    tags = [
        {icon: 'article', title: 'News'},
        {icon: 'dns', title: 'IT'},
        {icon: 'radio', title: 'Radio Letovo'},
        {icon: 'airport_shuttle', title: 'Lifestyle'},
        {icon: 'sports_soccer', title: 'Sport'},
        {icon: 'games', title: 'Games'},
        {icon: 'history_edu', title: 'History'},
        {icon: 'group', title: 'People'},
        {icon: 'school', title: 'School'},
        {icon: 'store', title: 'Business'},
        {icon: 'self_improvement', title: 'God'},
        {icon: 'insert_emoticon', title: 'Stand up'},
        {icon: 'theaters', title: 'Video'},
        {icon: 'audiotrack', title: 'Music'},
        {icon: 'psychology', title: 'Thinking'},
        {icon: 'all_inbox', title: 'All'},
    ];

    constructor(
        private snackBar: MatSnackBar,
        private readonly storage: AngularFireStorage,
        private readonly db: AngularFirestore
    ) {
    }

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    onFileSelected(event) {
        const n = this.getRandomInt(100000000000, 999999999999);
        this.trackid = n;
        const file = event.target.files[0];
        const filePath = `Podcasts/Track/${n}`;
        const fileRef = this.storage.ref(filePath);
        const task = this.storage.upload(`Podcasts/Track/${n}`, file);
        task
            .snapshotChanges()
            .pipe(
                finalize(() => {
                    this.downloadURL = fileRef.getDownloadURL();
                    this.downloadURL.subscribe(url => {
                        if (url) {
                            this.fb = url;
                        }
                        console.log(this.fb);
                    });
                })
            )
            .subscribe(url => {
                if (url) {
                    this.snackBar.open('File uploaded!', 'OK', {
                        duration: 1000,
                    });
                }
            });
    }

    onImageSelected(event) {
        const n = this.getRandomInt(100000000000, 999999999999);
        this.imageid = n;
        const file = event.target.files[0];
        const filePath = `Podcasts/Images/${n}`;
        const fileRef = this.storage.ref(filePath);
        const task = this.storage.upload(`Podcasts/Images/${n}`, file);
        task
            .snapshotChanges()
            .pipe(
                finalize(() => {
                    this.downloadImageURL = fileRef.getDownloadURL();
                    this.downloadImageURL.subscribe(url => {
                        if (url) {
                            this.fbimage = url;
                        }
                        console.log(this.fbimage);
                    });
                })
            )
            .subscribe(url => {
                if (url) {
                    this.snackBar.open('Image uploaded!', 'OK', {
                        duration: 1000,
                    });
                }
            });
    }

    upload() {
        if (this.type === 'Podcast') {
            this.db.collection('podcasts').add({
                title: this.title,
                img: this.imageid,
                sdescription: this.sdescription,
                description: this.description,
                trackid: this.trackid,
                tag: this.tag,
                author: firebase.auth().currentUser.email,
            }).then(() => {
                this.snackBar.open('"' + this.title + '" podcast published!', 'OK', {
                    duration: 1000,
                });
            });
        } else {
            this.db.collection('shorts').add({title: this.title, description: this.description, author: firebase.auth().currentUser.email}).then(value => {
                this.snackBar.open('"' + this.title + '" short published!', 'OK', {
                    duration: 1000,
                });
            });
        }
    }


    getProfile() {
        return firebase.auth().currentUser;
    }

    sendEmail() {
        firebase.auth().currentUser.sendEmailVerification();
    }
}
