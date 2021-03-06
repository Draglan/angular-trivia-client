import { Component, OnInit } from '@angular/core';
import { RoomService } from '../room.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { RoomInformation } from '../../core/room-info';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.css']
})
export class RoomListComponent implements OnInit 
{
  rooms: Observable<RoomInformation[]>;

  private hidden: boolean = false;

  constructor
  (
    private roomService: RoomService,
    private activeRoute: ActivatedRoute
  ) 
  {
  }

  hide()     { this.hidden = true;  }
  show()     { this.hidden = false; }
  isHidden() { return this.hidden;  }

  ngOnInit() 
  {
    this.rooms = this.roomService.rooms;
    this.roomService.enteredLobby.subscribe(_ => this.show());
    this.roomService.leftLobby.subscribe(_ => this.hide());
    this.roomService.enteredGameRoom.subscribe(_ => this.hide());
    this.roomService.leftGameRoom.subscribe(_ => this.hide());
  }
}
