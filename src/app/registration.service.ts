import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  needNickname: Observable<any> = this.socket.fromEvent<any>('need nickname');

  constructor(private socket: Socket, private router: Router, private activeRoute: ActivatedRoute)
  { 
    this.needNickname.subscribe(
      _ =>
      {
        this.router.navigateByUrl('/nickname');
      }
    );
  }

  // Tells the server to give us the given nickname.
  setNickname(nickname: string)
  {
    this.socket.emit('set nickname', nickname);
  }
}
