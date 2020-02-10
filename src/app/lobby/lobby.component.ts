import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { RoomListComponent } from '../room-list/room-list.component';
import { Router, ActivatedRoute } from '@angular/router';
import { RoomService } from '../room.service';
import { CreateRoomComponent } from '../create-room/create-room.component';
import { trigger, state, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css'],
  animations: [
    trigger('fade', [
      state('in', style({
        opacity: 1
      })),

      state('out', style({
        opacity: 0
      })),

      transition('out <=> in', [
        animate('100ms')
      ])
    ])
  ]
})
export class LobbyComponent implements OnInit 
{ 
  @ViewChild('createRoomForm', {static: false})
  popupForm: CreateRoomComponent;
  
  @ViewChild('formdisplay', {static: false})
  formDisplay: ElementRef;

  showForm: boolean = false;

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
    this.showForm = true;
  }

  hideNewRoomForm()
  {
    this.showForm = false;
  }

  fadeEnd(event)
  {
    if (event.fromState === 'in')
    {
      this.formDisplay.nativeElement.style.display = 'none';
    }
  }

  fadeStart(event)
  {
    if (event.fromState === 'out')
    {
      this.formDisplay.nativeElement.style.display = 'inherit';
    }
  }
}
