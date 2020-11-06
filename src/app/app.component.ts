import {Component, OnInit} from '@angular/core';
import {PodcastsService} from './podcasts.service';
import {Observable} from 'rxjs';
import {AngularFirestore} from 'angularfire2/firestore';
import {PlayerService, url} from './player.service';
import * as firebase from 'firebase';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {delay} from 'rxjs/operators';
import {DarkService} from './dark.service';




@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
    constructor(public player: PlayerService, private authService: AuthService, private router: Router, private darkService: DarkService) {

    }
    ngOnInit() {
        this.router.events.subscribe((val) => {
            // @ts-ignore
            if (val.url !== '/signin' && val.url !== '/signup' && val.url !== undefined) {
                if (!this.isAuth()) {
                    this.router.navigateByUrl('signin');
                }
            }

        });
    }

    getUrl() {
        return url;
    }

    isAuth() {
        return firebase.auth().currentUser !== null;
    }


}
