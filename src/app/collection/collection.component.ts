import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFirestore} from 'angularfire2/firestore';
import {AngularFireStorage} from '@angular/fire/storage';
import {PlayerService} from '../player.service';
import {ActivatedRoute, Router} from '@angular/router';
import {async} from 'rxjs/internal/scheduler/async';

@Component({
    selector: 'app-collection',
    templateUrl: './collection.component.html',
    styleUrls: ['./collection.component.css']
})
export class CollectionComponent {
    id: string;
    collection: any;
    data = [];

    constructor(private player: PlayerService, private db: AngularFirestore, private storage: AngularFireStorage, private route: ActivatedRoute) {
        this.id = this.route.snapshot.paramMap.get('id');
        db.collection('/collections').doc(String(this.id)).valueChanges().subscribe(
            value => {
                this.collection = value;
                // @ts-ignore
                value.data.forEach(value => {
                    this.db.collection('/podcasts').doc(String(value)).valueChanges().subscribe(
                        value => {
                            this.data.push(value);
                        }
                    );
                });
            }
        );
    }
    play(tracktitle, trackid) {
        this.player.play(tracktitle, trackid);
    }

}
