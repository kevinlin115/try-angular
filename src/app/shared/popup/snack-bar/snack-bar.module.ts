import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ChallengeReminderComponent } from './challenge-reminder/challenge-reminder.component';



@NgModule({
  declarations: [ChallengeReminderComponent],
  imports: [
    CommonModule,
    TranslateModule
  ],
  entryComponents: [
    ChallengeReminderComponent
  ]
})
export class SnackBarModule { }
