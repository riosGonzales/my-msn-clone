import { Component, OnInit } from '@angular/core';

import { StateService } from '../services/status.service';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css',
})
export class ToolbarComponent implements OnInit {
  constructor(private stateService: StateService) {}

  currentHour: string = '';

  ngOnInit() {
    this.updateHour();
    setInterval(() => this.updateHour(), 1000);
  }

  //abrirVentanas
  mostrarLogin(): void {
    this.stateService.mostrarLogin();
  }

  //Hora
  updateHour() {
    const date = new Date();
    const hours = this.formatTime(date.getHours());
    const minutes = this.formatTime(date.getMinutes());

    this.currentHour = `${hours}:${minutes}`;
  }

  formatTime(value: number): string {
    return value < 10 ? `0${value}` : value.toString();
  }
}
