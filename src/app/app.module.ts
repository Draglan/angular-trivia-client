import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { LobbyUserListComponent } from './user-list/lobby-user-list.component';
import { RoomListComponent } from './room-list/room-list.component';
import { LobbyComponent } from './lobby/lobby.component';
import { TriviaRoomComponent } from './trivia-room/trivia-room.component';
import { ChatComponent } from './chat/chat.component';
import { QuestionHistoryComponent } from './question-history/question-history.component';
import { SelectNicknameComponent } from './select-nickname/select-nickname.component';
import { RegistrationService } from './registration.service';
import { CreateRoomComponent } from './create-room/create-room.component';
import { DisconnectComponent } from './disconnect/disconnect.component';
import { MaxLengthPipe } from '../core/max-length-pipe';
import { GameUserListComponent } from './game-user-list/game-user-list.component';

// Tells the socket.io service where to connect.
const socketIoConfig: SocketIoConfig = 
{
  url: 'http://localhost:3000',
  options: {}
};

@NgModule({
  declarations: [
    AppComponent,
    LobbyUserListComponent,
    RoomListComponent,
    LobbyComponent,
    TriviaRoomComponent,
    ChatComponent,
    QuestionHistoryComponent,
    SelectNicknameComponent,
    CreateRoomComponent,
    DisconnectComponent,
    MaxLengthPipe,
    GameUserListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocketIoModule.forRoot(socketIoConfig),
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule 
{ 
  constructor(private registration: RegistrationService){}
}
