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
  createRoomForm: FormGroup;
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
        name:       [`${this.registration.getNickname()}'s room`, Validators.required],
        difficulty: ['', Validators.required],
        category:   ['', Validators.required]
      }
    );

    this.questions.askForCategories();
  }

  onSubmit()
  {
    if (!this.createRoomForm.valid) return;

    let difficulty: string = null;
    let categoryId: number = null;
    let name:       string = this.createRoomForm.value.name;

    if (this.createRoomForm.value.difficulty != 'any') difficulty = this.createRoomForm.value.difficulty;
    if (this.createRoomForm.value.category   != 'any') categoryId = +this.createRoomForm.value.category;

    this.roomService.createRoom(name, categoryId, difficulty);
  }
}
