import { Component, OnInit, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-center-button',
  templateUrl: './center-button.component.html',
  styleUrls: ['./center-button.component.scss']
})
export class CenterButtonComponent implements OnInit {

  @Input() disabled = true;
  @Input() btnText = 'DIALOG.TITLE.CONFIRM';
  @Input() height = ''
  @Output() btnClick: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onBtnClick() {
    this.btnClick.emit();
  }

}
