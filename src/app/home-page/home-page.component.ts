import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFirestore} from 'angularfire2/firestore';
import {AngularFireStorage} from '@angular/fire/storage';
import {PlayerService} from '../player.service';
import {storage} from 'firebase';

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
    public podcasts: Observable<any[]>;
    public wpodcast: Observable<any[]>;
    tags = [
        {icon: 'all_inbox', title: 'All'},
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
    ];
    activetag = 'All';

    constructor(db: AngularFirestore, private storage: AngularFireStorage, private player: PlayerService) {
        this.podcasts = db.collection('/podcasts').valueChanges();
        this.wpodcast = db.collection('/wpodcast').valueChanges();
    }


    play(tracktitle, trackid) {
        this.player.play(tracktitle, trackid);
    }
}
