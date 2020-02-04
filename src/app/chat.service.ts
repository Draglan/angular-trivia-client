import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { ChatMessage, MessageType } from '../core/chat-message';
import { switchMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChatService 
{

  // Subscribe to this to get a stream of chat messages.
  message: Observable<ChatMessage> = this.socket.fromEvent<any>('message').pipe
  (
    map( (response) => new ChatMessage(response.nickname, response.message, MessageType.Message) )  
  );

  constructor(private socket: Socket) 
  { 
  }

  // Send a message to other users in the same room.
  sendMessage(message: string)
  {
    this.socket.emit('message', message);
  }
}
