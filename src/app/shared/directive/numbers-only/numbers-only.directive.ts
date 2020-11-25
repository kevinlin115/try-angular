import { Directive, ElementRef, HostListener, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: 'input[appNumbersOnly]'
})
export class NumbersOnlyDirective {
  @Output() notTypingNumber: EventEmitter<any> = new EventEmitter();
  @Output() typingNumber: EventEmitter<any> = new EventEmitter();
  constructor(
    private er: ElementRef
  ) { }

  @HostListener('input', ['$event']) onInputChange(event) {
    const initValue = this.er.nativeElement.value;
    this.er.nativeElement.value = initValue.replace(/[^0-9]*/g, '');
    if (initValue !== this.er.nativeElement.value) {
      event.stopPropagation();
      this.notTypingNumber.emit();
    } else {
      this.typingNumber.emit();
    }
  }

}
