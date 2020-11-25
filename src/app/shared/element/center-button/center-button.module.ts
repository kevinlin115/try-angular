import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import { CenterButtonComponent } from './center-button.component';

@NgModule({
  declarations: [CenterButtonComponent],
  imports: [
    CommonModule,
    TranslateModule,
    MatButtonModule
  ],
  exports: [
    CenterButtonComponent
  ]
})
export class CenterButtonModule { }
