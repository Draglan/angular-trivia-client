import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { RoomListComponent } from './room-list/room-list.component';
import { AppComponent } from './app.component';
import { LobbyComponent } from './lobby/lobby.component';
import { TriviaRoomComponent } from './trivia-room/trivia-room.component';
import { SelectNicknameComponent } from './select-nickname/select-nickname.component';


const routes: Routes = [
  {path: '', redirectTo: 'lobby', pathMatch: 'full'},
  {path: 'lobby', component: LobbyComponent},
  {path: 'r/:id', component: TriviaRoomComponent},
  {path: 'nickname', component: SelectNicknameComponent},
  {path: '**', redirectTo: 'lobby'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
