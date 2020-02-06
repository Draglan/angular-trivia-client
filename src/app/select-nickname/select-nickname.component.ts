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
  errorMessage: string = '';

  private invalidErrorMessage: string = 'Nickname should be between 1 and 16 characters.';

  constructor(private fb: FormBuilder, private registration: RegistrationService, private router: Router) { }

  ngOnInit() 
  {
    this.selectNicknameForm = this.fb.group
    (
      {
        nickname: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(16)])]
      }
    );

    // Redirect to the previous url if they already have a nickname.
    if (this.registration.getNickname().length > 0)
    {
      this.router.navigateByUrl(this.registration.getPreviousUrl());
    }
  }

  onSubmit()
  {
    if (!this.selectNicknameForm.valid)
    {
      this.errorMessage = this.invalidErrorMessage;
      return;
    }

    this.registration.setNickname(this.selectNicknameForm.value.nickname).then(value => this.handleSubmission(value));
  }

  handleSubmission(value: string)
  {
    switch (value)
    {
      case 'good nickname':
        // nothing to do
        break;

      case 'invalid nickname':
        this.errorMessage = this.invalidErrorMessage;
        break;

      case 'nickname taken':
        this.errorMessage = 'That nickname is already in use.';
        break;
    }
  }
}
