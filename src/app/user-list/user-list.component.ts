import { Component, OnInit } from '@angular/core';
import { RoomService } from '../room.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit 
{
  users: Observable<string[]>;

  constructor(private roomService: RoomService) { }

  ngOnInit() 
  {
    this.users = this.roomService.users;
  }

}
