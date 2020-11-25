import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { ChallengeReminderComponent, ChallengeReminderData } from './challenge-reminder/challenge-reminder.component';
import { environment } from 'src/environments/environment';

@Injectable()
export class SnackBarService {

  constructor(
    private snackBar: MatSnackBar
  ) { }

  challengeReminder(data?: ChallengeReminderData) {
    const config = new MatSnackBarConfig();
    config.duration = environment.snackBarDuration;
    config.data = data;
    this.snackBar.openFromComponent(ChallengeReminderComponent, config);
  }
}
