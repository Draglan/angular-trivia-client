import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistrationService } from '../registration.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-select-nickname',
  templateUrl: './select-nickname.component.html',
  styleUrls: ['./select-nickname.component.css']
})
export class SelectNicknameComponent implements OnInit {
  selectNicknameForm: FormGroup;
  errorMessage: string;

  constructor(private fb: FormBuilder, private registration: RegistrationService, private router: Router) { }

  ngOnInit() 
  {
    this.selectNicknameForm = this.fb.group
    (
      {
        nickname: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(16)])]
      }
    );
  }

  onSubmit()
  {
    if (!this.selectNicknameForm.valid)
    {
      this.errorMessage = "Username should be between 1 and 16 characters.";
      return;
    }

    this.registration.setNickname(this.selectNicknameForm.value.nickname);
    this.router.navigateByUrl('/lobby');
  }

}
