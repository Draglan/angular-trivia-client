import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable, of, Subject, Subscription, BehaviorSubject } from 'rxjs';
import { merge, switchMap } from 'rxjs/operators';
import { Router, NavigationEnd, ActivatedRoute, NavigationStart, DefaultUrlSerializer } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoomService 
{
  userList       : Observable<string[]>   = this.socket.fromEvent<string[]>('user list');
  userJoined     : Observable<string>     = this.socket.fromEvent<string>  ('user joined');
  userLeft       : Observable<string>     = this.socket.fromEvent<string>  ('user left');

  enteredGameRoom: Observable<string>     = this.socket.fromEvent<string>  ('entered game room');
  leftGameRoom   : Observable<any>        = this.socket.fromEvent<any>     ('left game room');
  roomList       : Observable<string[]>   = this.socket.fromEvent<string[]>('room list');
  newRoom        : Observable<string>     = this.socket.fromEvent<string>  ('new room');
  deleteRoom     : Observable<string>     = this.socket.fromEvent<string>  ('delete room');

  // Subscribe to this to get a stream of all of the users in the current room.
  users: Subject<string[]> = new BehaviorSubject<string[]>([]);

  // Subscribe to this to get a stream of all of the rooms. Only received when in the lobby.
  rooms: Subject<string[]> = new BehaviorSubject<string[]>([]);

  private allUsers: string[] = [];
  private allRooms: string[] = [];
  
  constructor
  (
    private socket: Socket,
    private router: Router,
    private route: ActivatedRoute
  )
  { 
    // Set up subscriptions for this.users:
    //
    this.userList.subscribe
    (
      (users: string[]) => 
      {
        this.allUsers = users; 
        this.users.next(this.allUsers)
      }
    );

    this.userJoined.subscribe
    (
      (user: string) => 
      {
        this.allUsers.push(user); 
        this.users.next(this.allUsers)
      }
    );
    
    this.userLeft.subscribe
    (
      (user: string) =>
      {
        this.allUsers.splice(this.allUsers.findIndex(u => u === user), 1);
        this.users.next(this.allUsers);
      }
    );

    // Set up subscriptions for this.rooms:
    //
    this.roomList.subscribe
    (
      (rooms: string[]) => 
      {
        this.allRooms = rooms;
        this.rooms.next(this.allRooms);
      } 
    );

    this.newRoom.subscribe
    (
      (newRoom: string) =>
      {
        this.allRooms.push(newRoom);
        this.rooms.next(this.allRooms);
      }
    );

    this.deleteRoom.subscribe
    (
      (deletedRoom: string) =>
      {
        this.allRooms.splice( this.allRooms.findIndex(r => r === deletedRoom), 1 );
        this.rooms.next(this.allRooms);
      }
    );

    this.enteredGameRoom.subscribe( (roomId: string) => this.router.navigateByUrl(`/r/${roomId}`) );
    this.leftGameRoom.subscribe( _ => this.router.navigateByUrl('/lobby') );
  }

  // Tell the server we want to join the room with the given id.
  joinRoom(id: string)
  {
    this.socket.emit('join room', id);
  }

  // Tell the server we want to leave the current room.
  leaveRoom()
  {
    this.socket.emit('leave room');
  }

  // Tell the server we want to create a new room.
  createRoom()
  {
    this.socket.emit('create room');
  }
}