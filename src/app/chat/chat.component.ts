import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChatService } from '../chat.service';
import { ChatMessage } from '../../core/chat-message';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  @ViewChild('chatbox', {static: false})
  chatbox: ElementRef;

  messages: ChatMessage[] = [];
  messageForm: FormGroup;
  constructor(private fb: FormBuilder, private chat: ChatService) { }

  ngOnInit() 
  {
    this.messageForm = this.fb.group
    (
      { message: ['', Validators.required] }
    );

    this.chat.message.subscribe
    (
      (message: ChatMessage) =>
      {
        this.messages.push(message);
      }
    )
  }

  sendMessage(msg: string)
  {
    if (!this.messageForm.valid) return;

    this.chat.sendMessage(msg);
    this.messageForm.reset();
    this.scrollToBottom();
  }

  scrollToBottom()
  {
    this.chatbox.nativeElement.scrollTop = this.chatbox.nativeElement.scrollHeight;
  }

}
