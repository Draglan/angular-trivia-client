import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../question.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RoomService } from '../room.service';

@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.css']
})
export class CreateRoomComponent implements OnInit 
{

  createRoomForm: FormGroup;
  constructor(private questions: QuestionService, private fb: FormBuilder, private roomService: RoomService) { }

  ngOnInit() 
  {
    this.createRoomForm = this.fb.group
    (
      {
        name: ['', Validators.required],
        difficulty: ['', Validators.required],
        category: ['', Validators.required]
      }
    );

    this.questions.askForCategories();
  }

  onSubmit()
  {
    if (!this.createRoomForm.valid) return;

    let difficulty: string = '';
    let category: number = -1;

    if (this.createRoomForm.value.difficulty != 'any') difficulty = this.createRoomForm.value.difficulty;
    if (this.createRoomForm.value.category != 'any') category = this.createRoomForm.value.category;
    console.log(this.createRoomForm.value);

    this.roomService.createRoom(+category, difficulty);
  }
}
