import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { RoomListComponent } from '../room-list/room-list.component';
import { Router, ActivatedRoute } from '@angular/router';
import { RoomService } from '../room.service';
import { CreateRoomComponent } from '../create-room/create-room.component';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent implements OnInit 
{ 
  @ViewChild('createRoomForm', {static: false})
  popupForm: CreateRoomComponent;
  
  @ViewChild('formdisplay', {static: false})
  formDisplay: ElementRef;

  constructor
  (
    private roomService: RoomService,
    private router: Router
  )
  {
  }

  ngOnInit()
  {
    document.addEventListener
    (
      'keyup',
      (event) =>
      {
        if (event && event.keyCode === 27 && this.formDisplay.nativeElement.style.display != 'none')
        {
          this.hideNewRoomForm();
        }
      }
    );
  }

  showNewRoomForm()
  {
    this.formDisplay.nativeElement.style.display = 'inherit';
  }

  hideNewRoomForm()
  {
    this.popupForm.createRoomForm.reset();
    this.formDisplay.nativeElement.style.display = 'none';
  }
}
