import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import {HomePageComponent} from './home-page/home-page.component';
import {RouterModule} from '@angular/router';
import {ShortsPageComponent} from './shorts-page/shorts-page.component';
import {AddComponent} from './add/add.component';
import {AccountComponent} from './account/account.component';
import {SettingsComponent} from './settings/settings.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatChipsModule} from '@angular/material/chips';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatOptionModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireModule } from 'angularfire2';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {FormsModule} from '@angular/forms';
import {NgxAudioPlayerModule} from 'ngx-audio-player';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import * as firebase from 'firebase';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import {AppBugComponent, AppTermsComponent} from './dialogs.service';
import {MatDialogModule} from '@angular/material/dialog';
import { CollectionComponent } from './collection/collection.component';
import { CollectionsComponent } from './collections/collections.component';
import { OtherUserComponent } from './other-user/other-user.component';
import {MatMenuModule} from '@angular/material/menu';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

const routes = [
  {path: 'podcasts', component: HomePageComponent},
  {path: 'add', component: AddComponent},
  {path: 'collection/:id', component: CollectionComponent},
  {path: 'users/:user', component: OtherUserComponent},
  {path: 'collection', component: CollectionsComponent},
  {path: 'account', component: AccountComponent},
  {path: 'settings', component: SettingsComponent},
  {path: 'shorts', component: ShortsPageComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'signin', component: SigninComponent},
];
export const firebaseConfig = {
    apiKey: 'AIzaSyDEZcJcO6dsWj2m5Bnxnneyk9MK7_bhWvo',
    authDomain: 'podcasts-letovo.firebaseapp.com',
    databaseURL: 'https://podcasts-letovo.firebaseio.com',
    projectId: 'podcasts-letovo',
    storageBucket: 'podcasts-letovo.appspot.com',
    messagingSenderId: '106073479178',
    appId: '1:106073479178:web:b4afe6a4a18fafdde8a7f3',
    measurementId: 'G-J9FZ9VDJSZ'
};
firebase.initializeApp(firebaseConfig);
firebase.analytics();


@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    ShortsPageComponent,
    AddComponent,
    AppBugComponent,
    AppTermsComponent,
    AccountComponent,
    SettingsComponent,
    SigninComponent,
    SignupComponent,
    CollectionComponent,
    CollectionsComponent,
    OtherUserComponent,
  ],
    imports: [
        RouterModule.forRoot(routes),
        BrowserModule,
        BrowserAnimationsModule,
        MatIconModule,
        RouterModule,
        MatFormFieldModule,
        MatSnackBarModule,
        MatInputModule,
        MatChipsModule,
        MatButtonToggleModule,
        AngularFireModule.initializeApp(firebaseConfig),
        AngularFireStorageModule,
        AngularFirestoreModule,
        MatButtonModule,
        MatTooltipModule,
        MatOptionModule,
        MatSelectModule,
        MatProgressBarModule,
        FormsModule,
        NgxAudioPlayerModule,
        MatListModule,
        MatCardModule,
        MatSlideToggleModule,
        MatProgressSpinnerModule,
        MatDialogModule,
        MatMenuModule,
        ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
    ],
  providers: [
      {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
