import { Component, HostListener, OnInit } from '@angular/core';

import { BoxFriendsComponent } from '../box-friends/box-friends.component';
import { BoxMessagesComponent } from '../box-messages/box-messages.component';

import { StateService } from '../services/status.service';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-messenger',
  standalone: true,
  imports: [BoxFriendsComponent, BoxMessagesComponent, CommonModule],
  templateUrl: './messenger.component.html',
  styleUrl: './messenger.component.css',
})
export class MessengerComponent implements OnInit {
  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.checkScreenWidth();
  }

  constructor(public stateService: StateService) {}

  get boxMSJ(): boolean {
    return this.stateService.boxMSJ;
  }

  get boxFriends(): boolean {
    return this.stateService.boxFriends;
  }

  get isMobile(): boolean {
    return this.stateService.isMobile;
  }

  ngOnInit(): void {
    this.checkScreenWidth();
  }

  checkScreenWidth(): void {
    this.stateService.boxFriends = true;
    this.stateService.isMobile = window.innerWidth < 768;
    if (this.stateService.isMobile) {
      this.stateService.boxMSJ = false;
    } else {
      this.stateService.boxMSJ = true;
    }
  }
}
