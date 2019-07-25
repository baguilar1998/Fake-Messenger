import { Component, OnInit } from '@angular/core';
import { SocketService } from '../services/socket.service';
import {Event} from '../../client-enums';
import { EVENT_MANAGER_PLUGINS } from '../../../node_modules/@angular/platform-browser';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  constructor() {}
  ngOnInit() {
  }


}
