import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OtherModuleRoutingModule } from './other-module-routing.module';
import { Other1Component } from './other1/other1.component';
import { OtherService } from './other.service';


@NgModule({
  declarations: [Other1Component],
  imports: [
    CommonModule,
    OtherModuleRoutingModule
  ],
  providers: [
    OtherService
  ]
})
export class OtherModuleModule { }
