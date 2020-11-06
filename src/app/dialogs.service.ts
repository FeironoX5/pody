import {Component, Injectable} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {AngularFireStorage} from '@angular/fire/storage';
import {AngularFirestore} from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root'
})
export class DialogsService {

  constructor(public dialog: MatDialog) { }

  openBugDialog() {
    const dialogRef = this.dialog.open(AppBugComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  openTermsDialog() {
    const dialogRef = this.dialog.open(AppTermsComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
@Component({
  selector: 'app-bug-component',
  templateUrl: 'bug-dialog.html',
})
export class AppBugComponent {
  data: string;
  constructor(private db: AngularFirestore) {
  }
  report() {
    if (this.data.length > 10) {
      this.db.collection('/bugs').add({data: this.data});
    }
  }
}
@Component({
  selector: 'app-terms-component',
  templateUrl: 'terms-dialog.html',
})
export class AppTermsComponent {}
