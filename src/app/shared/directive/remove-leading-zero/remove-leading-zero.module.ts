import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RemoveLeadingZeroDirective } from './remove-leading-zero.directive';



@NgModule({
  declarations: [RemoveLeadingZeroDirective],
  imports: [
    CommonModule
  ],
  exports: [
    RemoveLeadingZeroDirective
  ]
})
export class RemoveLeadingZeroModule { }
