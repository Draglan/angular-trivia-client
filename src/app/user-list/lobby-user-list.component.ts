import { Component, OnInit } from '@angular/core';
import { RoomService } from '../room.service';
import { Observable } from 'rxjs';
import { RegistrationService } from '../registration.service';

@Component({
  selector: 'app-lobby-user-list',
  templateUrl: './lobby-user-list.component.html',
  styleUrls: ['./lobby-user-list.component.css']
})
export class LobbyUserListComponent implements OnInit 
{
  users: Observable<string[]>;

  constructor(private roomService: RoomService, private registration: RegistrationService) { }

  ngOnInit() 
  {
    this.users = this.roomService.users;
  }

}
