import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChatService } from '../chat.service';
import { ChatMessage, MessageType } from '../../core/chat-message';
import { RoomService } from '../room.service';
import { QuestionService } from '../question.service';
import { Subscription } from 'rxjs';
import { TriviaQuestion } from '../../core/trivia-question';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  @ViewChild('chatbox', {static: false})
  chatbox: ElementRef;

  messages: ChatMessage[] = [];
  prevMessagesLength: number = 0;
  doScrollToBottom: boolean = true;
  currentQuestion: TriviaQuestion;
  subscriptions: Subscription[] = [];

  MessageType = MessageType;

  messageForm: FormGroup;
  constructor
  (
    private fb: FormBuilder, 
    private chat: ChatService, 
    private roomService: RoomService,
    private questionService: QuestionService
  ) { }

  ngOnInit() 
  {
    // Initialize the chatbox form.
    this.messageForm = this.fb.group
    (
      { message: ['', Validators.required] }
    );

    // Get the current question.
    this.subscriptions.push(this.questionService.question.subscribe
    (
      (q) => this.currentQuestion = q
    ));

    // Add all new messages to the message list.
    this.subscriptions.push(this.chat.message.subscribe
    (
      (message: ChatMessage) =>
      {
        this.messages.push(message);
      }
    ));

    // Notify users when someone joins or leaves the room.
    this.subscriptions.push(this.roomService.userJoined.subscribe
    (
      (nickname) =>
      { 
        this.messages.push(new ChatMessage(`${nickname} joined the room.`, '', MessageType.Log));
      }
    ));

    this.subscriptions.push(this.roomService.userLeft.subscribe
    (
      (nickname) =>
      {
        this.messages.push(new ChatMessage(`${nickname} left the room.`, '', MessageType.Log))
      }
    ));
  }

  ngOnDestroy()
  {
    // Release all of our subscriptions when the component dies.
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  ngAfterViewInit()
  {
    this.chatbox.nativeElement.addEventListener
    (
      'scroll', 
      ()=>
      {
        if (this.isScrollAtBottom())
        {
          // If we've scrolled to the bottom, start automatically
          // scrolling back to the bottom when a new message 
          // from another user appears in the chatbox.
          this.doScrollToBottom = true;
        }
        else
        {
          // If we aren't at the bottom, don't scroll to the bottom
          // when a message from another user appears.
          this.doScrollToBottom = false;
        }
      }
    );
  }

  // After Angular updates the view, check to see if any new messages
  // were added. If they were, scroll the chatbox to the bottom so the
  // user can see the new message.
  ngAfterViewChecked()
  {
    if (this.prevMessagesLength != this.messages.length && this.doScrollToBottom)
    {
      this.prevMessagesLength = this.messages.length;
      this.scrollToBottom();
    }
  }

  // Send the given message to the server.
  sendMessage(msg: string)
  {
    if (!this.messageForm.valid) return;

    this.chat.sendMessage(msg);
    this.messageForm.reset();

    // Always scroll to the bottom when a new message from ourself
    // appears.
    this.doScrollToBottom = true;
  }

  // Scroll to the bottom of the chatbox.
  scrollToBottom()
  {
    this.chatbox.nativeElement.scrollTop = this.chatbox.nativeElement.scrollHeight;
  }

  // Returns true if the chatbox is scrolled all the way down, false otherwise.
  isScrollAtBottom(): boolean
  {
    return this.chatbox.nativeElement.scrollTop === this.chatbox.nativeElement.scrollHeight - this.chatbox.nativeElement.clientHeight;
  }

}
