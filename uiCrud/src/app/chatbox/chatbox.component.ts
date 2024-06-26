import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';



@Component({
  selector: 'app-chatbox',
  standalone: true,
  imports: [RouterModule,CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './chatbox.component.html',
  styleUrl: './chatbox.component.scss'
})
export class ChatboxComponent implements OnInit {
  userMsg:any = '';
  userMsgForm!:FormGroup;
  BOT_MSGS:any[] = [
    "Hi, how are you?",
    "Ohh... I can't understand what you trying to say. Sorry!",
    "I like to play games... But I don't know how to play!",
    "Sorry if my answers are not relevant. :))",
    "I feel sleepy! :(",
  ];

  messages: { sender: string, content: string }[] = [];

constructor(private fb:FormBuilder){}

  ngOnInit(): void {
    this.userMsgForm = this.fb.group({
      message:[null,Validators.required]
    });
    this.sendBotMsg();
  }
 
sendBotMsg() {
  const randomBotMsgIndex = Math.floor(Math.random() * this.BOT_MSGS.length);
  this.messages.push({ sender: 'Bot', content: this.BOT_MSGS[randomBotMsgIndex] });
}


sendUserMsg(){
  if (this.userMsgForm.valid) {
     this.userMsg = this.userMsgForm.value.message;
    this.messages.push({ sender: 'User', content: this.userMsg });
    this.userMsgForm.reset();
    setTimeout(() => {
      this.sendBotMsg(); 
    }, 1000);
}
}

getCurrentTime(): string {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}


}



