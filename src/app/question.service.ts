import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { TriviaQuestion } from '../core/trivia-question';
import { Observable } from 'rxjs';
import { Category } from '../core/category';

@Injectable({
  providedIn: 'root'
})
export class QuestionService 
{
  // The current question.
  question   : Observable<TriviaQuestion>;

  // Whether or not the user's selected answer was correct.
  wasCorrect : Observable<boolean>;

  // Seconds left on the current question.
  secondsLeft: Observable<number>;

  // A list of all of the available categories.
  categories : Observable<Category[]>;

  constructor(private socket: Socket) 
  {
    this.question    = this.socket.fromEvent<TriviaQuestion>('set question');
    this.wasCorrect  = this.socket.fromEvent<boolean>       ('answer result');
    this.secondsLeft = this.socket.fromEvent<number>        ('seconds left');
    this.categories  = this.socket.fromEvent<Category[]>    ('category list');
  }

  // Select the answer to the current question.
  selectAnswer(answerIndex: number)
  {
    this.socket.emit('answer', answerIndex);
  }

  askForCategories()
  {
    this.socket.emit('get category list');
  }
}
