import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  private isBuzzingSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  public isBuzzing$: Observable<boolean> = this.isBuzzingSubject.asObservable();

  boxMSJ: boolean = true;
  contentboxMSJ: boolean = true;
  boxFriends: boolean = true;
  isMobile: boolean = false;

  mostrarBoxMSJ(): void {
    this.contentboxMSJ = !this.contentboxMSJ;
  }

  ocultarBoxFriends(): void {
    this.boxFriends = false;
    this.boxMSJ = true;
    this.contentboxMSJ = true;

  }
  
  ZumbidoMSN() {
    const audio = new Audio();
    audio.src = '/assets/sounds/buzz.mp3';
    audio.play();
    this.isBuzzingSubject.next(true);
    setTimeout(() => {
      this.isBuzzingSubject.next(false);
    }, 500);
  }
}
