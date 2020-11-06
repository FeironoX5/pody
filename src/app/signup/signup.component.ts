import {Component, OnInit} from '@angular/core';
import * as firebase from 'firebase';
import {MatSnackBar} from '@angular/material/snack-bar';
import {firebaseConfig} from '../app.module';
import {Router} from '@angular/router';
import GoogleAuthProvider = firebase.auth.GoogleAuthProvider;
import FacebookAuthProvider = firebase.auth.FacebookAuthProvider;

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
    email: string;
    password: string;
    loading = false;
    displayname: string;
    photourl: string;

    constructor(
        private router: Router,
        private snackBar: MatSnackBar,
    ) {
    }

    ngOnInit(): void {
    }

    createAccount() {
        this.loading = true;
        firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
            .then(value => {
                this.loading = false;
                this.snackBar.open('Profile created!', 'OK', {
                    duration: 1000,
                });
                firebase.auth().currentUser.updateProfile({displayName: this.displayname, photoURL: this.photourl});
                firebase.auth().currentUser.sendEmailVerification();
            })
            .catch(error => {
                this.loading = false;
                this.snackBar.open(error, 'OK', {
                    duration: 3000,
                });
            });
    }
    createAccountGoogle() {
        this.loading = true;
        firebase.auth().signInWithRedirect(new GoogleAuthProvider())
            .then(value => {
                this.loading = false;
                this.snackBar.open('Profile created!', 'OK', {
                    duration: 1000,
                });
                firebase.auth().currentUser.sendEmailVerification();
                firebase.auth().currentUser.photoURL = 'http://kdctmn.ru/uploads/img/default.png';
                this.router.navigateByUrl('/podcasts');
            })
            .catch(error => {
                this.loading = false;
                this.snackBar.open(error, 'OK', {
                    duration: 3000,
                });
            });

    }
    isAuth() {
        return firebase.auth().currentUser !== null;
    }
    createAccountFB() {
        this.loading = true;
        firebase.auth().signInWithRedirect(new FacebookAuthProvider())
            .then(value => {
                this.loading = false;
                this.snackBar.open('Profile created!', 'OK', {
                    duration: 1000,
                });
                firebase.auth().currentUser.sendEmailVerification();
                firebase.auth().currentUser.photoURL = 'http://kdctmn.ru/uploads/img/default.png';
                this.router.navigateByUrl('/podcasts');
            })
            .catch(error => {
                this.loading = false;
                this.snackBar.open(error, 'OK', {
                    duration: 3000,
                });
            });

    }
}
