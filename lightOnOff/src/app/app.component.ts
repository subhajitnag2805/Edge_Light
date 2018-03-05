import { Component } from '@angular/core';
import * as io from "socket.io-client";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  socket: any = null;

  constructor() {
    this.socket = io('http://localhost:7000');
  }

  temperature() {
    this.socket.emit('start', { status: 'temperature' });
  }

  gsr() {
    this.socket.emit('start', { status: 'gsr' });
  }
}
