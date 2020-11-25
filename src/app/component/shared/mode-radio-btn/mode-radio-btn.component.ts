import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FooterObj } from '@component/footer/footer.component';
@Component({
  selector: 'app-mode-radio-btn',
  templateUrl: './mode-radio-btn.component.html',
  styleUrls: ['./mode-radio-btn.component.scss']
})
export class ModeRadioBtnComponent implements OnInit {

  @Input() mode: FooterObj['mode'] = 'softcore';
  @Output() modeChange: EventEmitter<FooterObj['mode']> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onModeChange() {
    this.modeChange.emit(this.mode);
  }

}
