import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import * as firebase from 'firebase';
import {Router} from '@angular/router';
import GoogleAuthProvider = firebase.auth.GoogleAuthProvider;
import FacebookAuthProvider = firebase.auth.FacebookAuthProvider;

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
    email: string;
    password: string;
    loading = false;

    constructor(
        private snackBar: MatSnackBar,
        private router: Router,
    ) {
    }

    ngOnInit(): void {
    }

    logIn() {
        this.loading = true;
        firebase.auth().signInWithEmailAndPassword(this.email, this.password)
            .then(value => {
                this.loading = false;
                this.snackBar.open('Signed In!', 'OK', {
                    duration: 1000,
                });
                this.router.navigateByUrl('/podcasts');
            })
            .catch(error => {
                this.loading = false;
                this.snackBar.open(error, 'OK', {
                    duration: 3000,
                });
            });
    }

    logInGoogle() {
        this.loading = true;
        firebase.auth().signInWithRedirect(new GoogleAuthProvider())
            .then(value => {
                this.loading = false;
                this.snackBar.open('Signed In!', 'OK', {
                    duration: 1000,
                });
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

    logInFB() {
        this.loading = true;
        firebase.auth().signInWithRedirect(new FacebookAuthProvider())
            .then(value => {
                this.loading = false;
                this.snackBar.open('Signed In!', 'OK', {
                    duration: 1000,
                });
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
