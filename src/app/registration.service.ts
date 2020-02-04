import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { SelectNicknameComponent } from './select-nickname/select-nickname.component';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  needNickname: Observable<any> = this.socket.fromEvent<any>('need nickname');
  disconnect: Observable<any>   = this.socket.fromEvent<any>('disconnect');
  connection: Observable<any>   = this.socket.fromEvent<any>('connection');

  private nickname: string = '';

  constructor(private socket: Socket, private router: Router, private activeRoute: ActivatedRoute)
  { 
    this.needNickname.subscribe
    (
      _ =>
      {
        this.router.navigateByUrl('/nickname');
      }
    );

    this.disconnect.subscribe(() => this.router.navigateByUrl('/disconnect'));
  }

  // Tells the server to give us the given nickname.
  // The promise returns one of the following values:
  //  'good nickname' if the nickname was valid,
  //  'invalid nickname' if the nickname was invalid, and
  //  'nickname taken' if the nickname was taken.
  setNickname(nickname: string): Promise<string>
  {
    this.socket.emit('set nickname', nickname);
    this.nickname = nickname;

    let promises = [
      this.socket.fromOneTimeEvent<string>('good nickname'   ).then(() => 'good nickname'),
      this.socket.fromOneTimeEvent<string>('invalid nickname').then(() => 'invalid nickname'),
      this.socket.fromOneTimeEvent<string>('nickname taken'  ).then(() => 'nickname taken'),
    ];

    return Promise.race<string>(promises);
  }

  // Return the nickname of the user.
  getNickname(): string
  {
    return this.nickname;
  }
}
