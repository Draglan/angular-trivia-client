import { Component, OnInit, Input } from '@angular/core';
import { RoomListComponent } from '../room-list/room-list.component';
import { Router, ActivatedRoute } from '@angular/router';
import { RoomService } from '../room.service';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent implements OnInit 
{ 
  constructor
  (
    private roomService: RoomService,
    private router: Router
  )
  {
  }

  ngOnInit()
  {
    // When we enter the lobby, leave whatever room we were in before.
    // If we are just logging in, we'll already be in the lobby; that's okay
    // since the server doesn't do anything if we try to leave the lobby.
    this.roomService.leaveRoom();
  }

  showNewRoomForm()
  {
    this.router.navigateByUrl('/test-create-room');
  }
}
