import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFirestore} from 'angularfire2/firestore';
import * as firebase from 'firebase';

@Component({
    selector: 'app-shorts-page',
    templateUrl: './shorts-page.component.html',
    styleUrls: ['./shorts-page.component.css']
})
export class ShortsPageComponent {
    public shorts: Observable<any[]>;

    constructor(private db: AngularFirestore) {
        this.shorts = db.collection('/shorts').valueChanges({idField: 'id'});
    }

    like(short) {
        if (short.liked.indexOf(firebase.auth().currentUser.email) > -1) {
            const index = short.liked.indexOf(firebase.auth().currentUser.email);
            if (index > -1) {
                short.liked.splice(index, 1);
            }
            this.db.collection('/shorts').doc(short.id).update({likes: short.likes - 1});
        } else {
            short.liked.push(firebase.auth().currentUser.email);
            this.db.collection('/shorts').doc(short.id).update({likes: short.likes + 1});
        }
        this.db.collection('/shorts').doc(short.id).update({liked: short.liked});
    }
}
