import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {

  friends = ['Brian Aguilar', 'John Smith','','','','','','','','','','','','','','','','','','',''];
  constructor() { }

  ngOnInit() {
  }

}
