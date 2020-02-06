import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../question.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
        maxSeconds:       ['30', Validators.required],
        difficulty:       ['', Validators.required],
        category:         ['', Validators.required],
        canSkipQuestions: ['']
      }
    );

    this.questions.askForCategories();
  }

  onSubmit()
  {
    if (!this.createRoomForm.valid) return

    if (this.createRoomForm.value.maxSeconds < this.minSeconds || this.createRoomForm.value.maxSeconds > this.maxSeconds)
    {
      this.errorMessage = 'Please select between 5 and 300 seconds.';
      return;
    }

    let difficulty: string  = null;
    let categoryId: number  = null;
    let name:       string  = this.createRoomForm.value.name;
    let maxSeconds: number  = +this.createRoomForm.value.maxSeconds;
    let canSkip:    boolean = this.createRoomForm.value.canSkipQuestions === true;

    if (this.createRoomForm.value.difficulty != 'any') difficulty = this.createRoomForm.value.difficulty;
    if (this.createRoomForm.value.category   != 'any') categoryId = +this.createRoomForm.value.category;

    this.roomService.createRoom(name, categoryId, difficulty, maxSeconds, canSkip);
  }
}
