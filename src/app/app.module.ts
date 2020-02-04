import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { UserListComponent } from './user-list/user-list.component';
import { RoomListComponent } from './room-list/room-list.component';
import { LobbyComponent } from './lobby/lobby.component';
import { TriviaRoomComponent } from './trivia-room/trivia-room.component';
import { ChatComponent } from './chat/chat.component';
import { QuestionHistoryComponent } from './question-history/question-history.component';
import { SelectNicknameComponent } from './select-nickname/select-nickname.component';
import { RegistrationService } from './registration.service';
import { CreateRoomComponent } from './create-room/create-room.component';

// Tells the socket.io service where to connect.
const socketIoConfig: SocketIoConfig = 
{
  url: 'http://localhost:3000', 
  options: {}
};

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    RoomListComponent,
    LobbyComponent,
    TriviaRoomComponent,
    ChatComponent,
    QuestionHistoryComponent,
    SelectNicknameComponent,
    CreateRoomComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocketIoModule.forRoot(socketIoConfig),
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule 
{ 
  constructor(private registration: RegistrationService){}
}
