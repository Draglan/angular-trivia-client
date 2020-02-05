import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { UserStatistics } from '../../core/user-statistics';
import { Socket } from 'ngx-socket-io';
import { RoomService } from '../room.service';
import { RegistrationService } from '../registration.service';

@Component({
  selector: 'app-game-user-list',
  templateUrl: './game-user-list.component.html',
  styleUrls: ['./game-user-list.component.css']
})
export class GameUserListComponent implements OnInit {
  users: UserStatistics[] = [];
  userStatSubscription: Subscription;

  constructor(private roomService: RoomService, private registration: RegistrationService) { }

  ngOnInit() 
  {
    // Update the list of users and their stats.
    this.userStatSubscription = 
      this.roomService.setUserStats.subscribe
      (
        userStats => 
        {
          this.users = userStats;

          // Sort in order of decreasing points.
          this.users.sort
          ( (a,b) => 
            {
              if      (a.points < b.points) return 1;
              else if (a.points > b.points) return -1;
              else                          return 0;
            } 
          );
        }
      );
  }

  ngOnDestroy()
  {
    this.userStatSubscription.unsubscribe();
  }
}
