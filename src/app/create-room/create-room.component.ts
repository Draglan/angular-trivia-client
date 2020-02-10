import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../question.service';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { RoomService } from '../room.service';
import { RegistrationService } from '../registration.service';

@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.css']
})
export class CreateRoomComponent implements OnInit 
{
  minSeconds: number = 5;
  maxSeconds: number = 300;
  
  createRoomForm: FormGroup;

  secsPerQuestion: AbstractControl;
  numQuestions: AbstractControl;

  errorMessage: string = '';

  constructor
  (
    private questions: QuestionService, 
    private fb: FormBuilder, 
    private roomService: RoomService,
    private registration: RegistrationService
  ) { }

  ngOnInit() 
  {
    this.createRoomForm = this.fb.group
    (
      {
        name:             [`${this.registration.getNickname()}'s room`, Validators.required],
        numQuestions:     ['', Validators.compose([Validators.min(0), Validators.max(1000)])],
        secsPerQuestion:  ['30', Validators.compose([Validators.required, Validators.min(5), Validators.max(300)])],
        difficulty:       ['any', Validators.required],
        category:         ['any', Validators.required],
        canSkipQuestions: ['true']
      }
    );

    this.questions.askForCategories();

    this.secsPerQuestion = this.createRoomForm.get('secondsPerQuestion');
    this.numQuestions    = this.createRoomForm.get('numQuestions');
  }

  onSubmit()
  {
    if (!this.createRoomForm.valid) return
    
    let difficulty:   string  = null;
    let categoryId:   number  = null;
    let name:         string  = this.createRoomForm.value.name;
    let maxSeconds:   number  = +this.createRoomForm.value.secsPerQuestion;
    let canSkip:      boolean = this.createRoomForm.value.canSkipQuestions === true;
    let numQuestions: number  = +this.createRoomForm.value.numQuestions || 0;

    if (this.createRoomForm.value.difficulty != 'any') difficulty = this.createRoomForm.value.difficulty;
    if (this.createRoomForm.value.category   != 'any') categoryId = +this.createRoomForm.value.category;

    this.roomService.createRoom(name, categoryId, difficulty, maxSeconds, canSkip, numQuestions);
  }
}
