import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModeRadioBtnComponent } from './mode-radio-btn.component';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [ModeRadioBtnComponent],
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule
  ],
  exports: [
    ModeRadioBtnComponent
  ]
})
export class ModeRadioBtnModule { }
