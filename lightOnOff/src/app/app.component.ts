import { Component } from '@angular/core';
import * as io from "socket.io-client";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  socket:any = null;
  status:any = 'off';

  constructor() {
      this.socket = io('http://localhost:7000');
  }
  
  lightOn(){
     this.socket.emit('lightOnOff', {status:'ON'});
     this.status = 'on';
  }
  
  lightOff(){
     this.socket.emit('lightOnOff', {status:'OFF'});
     this.status = 'off';
  }
  
  toggleLight(){
       if(this.status == 'off'){
             this.lightOn();
       }else{
             this.lightOff();
       }
  }

}
