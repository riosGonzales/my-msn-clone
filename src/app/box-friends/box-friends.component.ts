import { Component, HostListener, OnInit } from '@angular/core';
import { BoxHeaderComponent } from '../box-header/box-header.component';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { CookieService } from 'ngx-cookie-service';
import { StateService } from '../services/status.service';

@Component({
  selector: 'app-box-friends',
  standalone: true,
  imports: [FormsModule, CommonModule, BoxHeaderComponent],
  templateUrl: './box-friends.component.html',
  styleUrl: './box-friends.component.css',
})
export class BoxFriendsComponent implements OnInit {
  username: string = 'Nombre por defecto';
  isMobile: boolean = false;

  constructor(
    private cookieService: CookieService,
    private stateService: StateService
  ) {
    const email = cookieService.get('email');
    this.username = email.split('@')[0];
  }



  ngOnInit(): void {
    this.isMobile = window.innerWidth < 768;

  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.isMobile = window.innerWidth < 768;
  }

  status: string[] = ['(Offline)', '(Online)', '(Busy)'];
  statusIcons: Record<string, string> = {
    '(Offline)': '/assets/icons/offline-user.webp',
    '(Online)': '/assets/icons/online-user.webp',
    '(Busy)': '/assets/icons/busy-user.webp',
  };

  showBoxMSJ() {
    console.log("abc");
    this.stateService.mostrarBoxMSJ();
  }

  hiddenBoxFriendsMobile() {
    if (this.isMobile) {
      this.stateService.ocultarBoxFriends();
    }
  }  
}
