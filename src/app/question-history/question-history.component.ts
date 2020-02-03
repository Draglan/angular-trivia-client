import { Component, OnInit, ViewChild } from '@angular/core';
import { TriviaQuestion } from '../../core/trivia-question';

class QuestionResult {
  constructor(question: TriviaQuestion, correct: boolean)
  {
    this.question = question;
    this.wasCorrect = correct;
  }

  question: TriviaQuestion;
  wasCorrect: boolean;
}

@Component({
  selector: 'app-question-history',
  templateUrl: './question-history.component.html',
  styleUrls: ['./question-history.component.css']
})
export class QuestionHistoryComponent implements OnInit {
  questions: QuestionResult[] = [];

  constructor() { }

  ngOnInit() 
  {
  }

  // Add a completed question to the history.
  addQuestion(question: TriviaQuestion, wasCorrect: boolean)
  {
    this.questions.push(new QuestionResult(question, wasCorrect));
  }
}
