import { Injectable, OnDestroy } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable, of, Subject, Subscription, BehaviorSubject } from 'rxjs';
import { merge, switchMap } from 'rxjs/operators';
import { Router, NavigationEnd, ActivatedRoute, NavigationStart, DefaultUrlSerializer } from '@angular/router';
import { RoomConfiguration } from '../core/room-configuration';
import { RoomInformation } from '../core/room-info';
import { UserStatistics } from '../core/user-statistics';

@Injectable({
  providedIn: 'root'
})
export class RoomService implements OnDestroy
{
  userList       : Observable<string[]>            = this.socket.fromEvent<string[]>         ('user list');
  userJoined     : Observable<string>              = this.socket.fromEvent<string>           ('user joined');
  userLeft       : Observable<string>              = this.socket.fromEvent<string>           ('user left');
  setUserStats   : Observable<UserStatistics[]>    = this.socket.fromEvent<UserStatistics[]> ('set user stats');

  enteredLobby   : Observable<any>                 = this.socket.fromEvent<any>              ('entered lobby');
  leftLobby      : Observable<any>                 = this.socket.fromEvent<any>              ('left lobby');
  enteredGameRoom: Observable<string>              = this.socket.fromEvent<string>           ('entered game room');
  leftGameRoom   : Observable<any>                 = this.socket.fromEvent<any>              ('left game room');
  roomList       : Observable<RoomInformation[]>   = this.socket.fromEvent<RoomInformation[]>('room list');
  newRoom        : Observable<RoomInformation>     = this.socket.fromEvent<RoomInformation>  ('new room');
  deleteRoom     : Observable<RoomInformation>     = this.socket.fromEvent<RoomInformation>  ('delete room');
  updateRoom     : Observable<RoomInformation>     = this.socket.fromEvent<RoomInformation>  ('update room');

  // Subscribe to this to get a stream of all of the users in the current room.
  users: Subject<string[]> = new BehaviorSubject<string[]>([]);

  // Subscribe to this to get a stream of all of the rooms. Only received when in the lobby.
  rooms: Subject<RoomInformation[]> = new BehaviorSubject<RoomInformation[]>([]);

  private allUsers: string[] = [];
  private allRooms: RoomInformation[] = [];
  private subscriptions: Subscription[] = [];
  
  constructor
  (
    private socket: Socket,
    private router: Router,
    private route: ActivatedRoute
  )
  { 
    // Set up subscriptions for this.users:
    //
    this.subscriptions.push(this.userList.subscribe
    (
      (users: string[]) => 
      {
        this.allUsers = users; 
        this.users.next(this.allUsers)
      }
    ));

    this.subscriptions.push(this.userJoined.subscribe
    (
      (user: string) => 
      {
        this.allUsers.push(user); 
        this.users.next(this.allUsers)
      }
    ));
    
    this.subscriptions.push(this.userLeft.subscribe
    (
      (user: string) =>
      {
        this.allUsers.splice(this.allUsers.findIndex(u => u === user), 1);
        this.users.next(this.allUsers);
      }
    ));

    // Set up subscriptions for this.rooms:
    //
    this.subscriptions.push(this.roomList.subscribe
    (
      (rooms: RoomInformation[]) => 
      {
        this.allRooms = rooms;
        this.rooms.next(this.allRooms);
      } 
    ));

    this.subscriptions.push(this.newRoom.subscribe
    (
      (newRoom: RoomInformation) =>
      {
        this.allRooms.push(newRoom);
        this.rooms.next(this.allRooms);
      }
    ));

    this.subscriptions.push(this.deleteRoom.subscribe
    (
      (deletedRoom: RoomInformation) =>
      {
        this.allRooms.splice( this.allRooms.findIndex(r => r.id === deletedRoom.id), 1 );
        this.rooms.next(this.allRooms);
      }
    ));

    this.subscriptions.push(this.updateRoom.subscribe
    (
      (updatedRoom: RoomInformation) =>
      {
        let room = this.allRooms.find(r => r.id === updatedRoom.id);
        if (room != undefined)
        {
          room.categoryName = updatedRoom.categoryName;
          room.difficulty   = updatedRoom.difficulty;
          room.name         = updatedRoom.name;
          room.playerCount  = updatedRoom.playerCount;
        }

        this.rooms.next(this.allRooms);
      }
    ));

    this.subscriptions.push(this.enteredGameRoom.subscribe( (roomId: string) => this.router.navigateByUrl(`/r/${roomId}`) ));
    this.subscriptions.push(this.enteredLobby.subscribe( _ => this.router.navigateByUrl('/lobby') ));
  }

  // Clean up subscriptions when done.
  ngOnDestroy()
  {
    this.subscriptions.forEach(s => s.unsubscribe());
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
  createRoom(name: string, categoryId: number = null, difficulty: string = null)
  {
    this.socket.emit('create room', {name: name, categoryId: categoryId, difficulty: difficulty});
  }
}