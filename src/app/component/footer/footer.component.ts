import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';

export class FooterObj {
  mode: 'softcore' | 'hardcore';
  constructor() {
    this.mode = 'softcore';
  }
}

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  webSocket: WebSocket;
  sendTest = 'Kevin sendTest';
  @Input() footerObj: FooterObj;
  @Output() modeChange: EventEmitter<FooterObj['mode']> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    this.webSocket = new WebSocket(environment.wsServerUrl);
    this.webSocket.onopen = () => {
      console.log(`WebSocket connected`);
    };
    this.webSocket.onmessage = (event) => {
      console.log(`WebSocket event`, event);
    };
    this.webSocket.onclose = () => {
      console.log(`WebSocket closed`);
    }
    this.webSocket.addEventListener(`open`, (event) => {
      console.log(`open success`, event);
    })
  }

  start() {

    this.webSocket.send(this.sendTest);
  }

  onModeChange(e) {
    this.modeChange.emit(e);
  }

}
