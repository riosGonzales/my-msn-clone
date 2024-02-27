import { Component, OnInit, HostListener } from '@angular/core';
import { BoxHeaderComponent } from '../box-header/box-header.component';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

import { CookieService } from 'ngx-cookie-service';
import { StateService } from '../services/status.service';

@Component({
  selector: 'app-box-messages',
  standalone: true,
  imports: [FormsModule, CommonModule, BoxHeaderComponent],
  templateUrl: './box-messages.component.html',
  styleUrl: './box-messages.component.css',
})
export class BoxMessagesComponent implements OnInit {
  conversationMessages: {
    username: string;
    message: string;
    fromUser: boolean;
  }[] = [];
  messageText: string = '';
  email: string = '';

  notificationSound = new Audio('/assets/sounds/notification.mp3');

  constructor(
    private cookieService: CookieService,
    private httpClient: HttpClient,
    private stateService: StateService
  ) {
    this.email = cookieService.get('email');
  }

get boxMSJ(): boolean {
  return this.stateService.contentboxMSJ;
}

  ngOnInit() {
    this.botReply('Hola... ¡soy un Bot mal hecho!');
  }

  userSendMessage() {
    if (this.messageText.trim() !== '') {
      this.sendMessage(this.messageText, true);
      setTimeout(() => {
        this.botReply('No he sido programado para mantener una conversación');
        this.playNotificationSound();
      }, 1000);

      this.messageText = '';
    }
  }

  botReply(message: string) {
    this.sendMessage(message, false);
  }

  sendMessage(message: string, fromUser: boolean) {
    this.conversationMessages.push({
      username: fromUser ? this.email : 'Bot',
      message: message,
      fromUser: fromUser,
    });
  }

  @HostListener('document:keydown.enter', ['$event'])
  handleEnterKey(event: KeyboardEvent) {
    event.preventDefault();
    this.userSendMessage();
  }

  preventEnter(event: Event) {
    event.preventDefault();
  }

  playNotificationSound() {
    this.notificationSound.play();
  }

  buzzing() {
    this.stateService.ZumbidoMSN();
  }
}
