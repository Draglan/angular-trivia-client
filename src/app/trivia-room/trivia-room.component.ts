import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RoomService } from '../room.service';
import { QuestionService } from '../question.service';
import { TriviaQuestion } from '../../core/trivia-question';
import { QuestionHistoryComponent } from '../question-history/question-history.component';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ChatComponent } from '../chat/chat.component';
import { ChatMessage, MessageType } from '../../core/chat-message';

@Component({
  selector: 'app-trivia-room',
  templateUrl: './trivia-room.component.html',
  styleUrls: ['./trivia-room.component.css']
})
export class TriviaRoomComponent implements OnInit {
  @ViewChild('chatbox', {static: false})
  chatbox: ChatComponent;

  id: string;
  question$: Observable<TriviaQuestion>;
  secondsLeft$: Observable<number>;
  selectedAnswerIndex: number = -1;

  private currentQuestion: TriviaQuestion;

  constructor
  (
    private route: ActivatedRoute,
    private roomService: RoomService,
    private questions: QuestionService
  ) { }

  ngOnInit() 
  {
    // Get the ID of the room we're trying to join from the current route.
    this.id = this.route.snapshot.paramMap.get('id');

    // Tell the server we want to join that room.
    this.roomService.joinRoom(this.id);

    // Create an observable that parses the current question.
    this.question$ = this.questions.question.pipe
    (
      map
      (
        q =>
        {
          // Remove ampersand-encoded text from the question,
          // answers, category, and difficulty strings.
          // (By ampersand-encoded, I mean like '&amp;')
          //
          q.question     = this.decodeHTMLText(q.question);
          q.categoryName = this.decodeHTMLText(q.categoryName);
          q.difficulty   = this.decodeHTMLText(q.difficulty);

          for (let i=0; i<q.answers.length; ++i)
          {
            q.answers[i] = this.decodeHTMLText(q.answers[i]);
          }

          return q;
        }
      )
    );

    this.question$.subscribe(q => this.currentQuestion = q);

    // The number of seconds left on the current question.
    this.secondsLeft$ = this.questions.secondsLeft;

    // Deselect the currently selected answer when we receive the correct answer.
    this.questions.wasCorrect.subscribe
    (
      (q) => 
      {
        // Add the result of the question to the chatbox.
        let msg = `Correct answer: ${this.currentQuestion.answers[this.currentQuestion.correctAnswerIndex]}`;
        msg    += ` (You chose: ${this.currentQuestion.answers[this.selectedAnswerIndex] || 'No selection'})`;

        if (q)
          this.chatbox.messages.push(new ChatMessage(this.currentQuestion.question, msg, MessageType.QuestionCorrect));
        else
          this.chatbox.messages.push(new ChatMessage(this.currentQuestion.question, msg, MessageType.QuestionIncorrect));

        // Unselect the answer.
        this.selectedAnswerIndex = -1;
      }
    );
  }

  ngOnDestroy()
  {
    // When the Trivia Room component is destroyed, tell the server
    // that we want to leave this room.
    this.roomService.leaveRoom();
  }

  // Select the answer with the given index. For example,
  // selecting 0 means the user selected the first available
  // answer.
  selectAnswer(index: number)
  {
    if (this.selectedAnswerIndex === -1)
    {
      this.questions.selectAnswer(index);
      this.selectedAnswerIndex = index;
    }
  }

  // Translate ampersand-encoded text into regular text.
  // (I.e. '&lt;' becomes '<')
  private decodeHTMLText(text: string)
  {
    let parser = new DOMParser();
    let dom    = parser.parseFromString(`<!doctype html><body>${text}`, 'text/html');

    return dom.body.textContent;
  }
}
