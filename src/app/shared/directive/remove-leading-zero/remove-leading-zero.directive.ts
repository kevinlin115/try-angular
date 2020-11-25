import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: 'input[appRemoveLeadingZero]'
})
export class RemoveLeadingZeroDirective {

  constructor(
    private er: ElementRef
  ) { }

  @HostListener('input') onInputChange() {
    this.er.nativeElement.value = String(this.er.nativeElement.value).replace(/^0+/, '');
  }

}
