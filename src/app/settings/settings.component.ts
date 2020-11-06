import { Component, OnInit } from '@angular/core';
import {DarkService} from '../dark.service';
import {DialogsService} from '../dialogs.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  constructor(public darkService: DarkService, public dialogsService: DialogsService) {
  }
  ngOnInit() {
  }

}
