import { Component, Inject, OnInit } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material';
import { ChallengeListService } from '@service/challenge-list.service';
import { Subject } from 'rxjs';

export interface ChallengeReminderData {
  buying: boolean;
  challengeName: string; // 已轉i18n
  challengeIndex: number;
  subChallengeName?: string; // 已轉i18n
  subChallengeIndex?: number;
}

export interface RecoverChallenge {
  challengeIndex: number;
  subChallengeIndex?: number;
}

@Component({
  selector: 'app-challenge-reminder',
  templateUrl: './challenge-reminder.component.html',
  styleUrls: ['./challenge-reminder.component.scss']
})
export class ChallengeReminderComponent implements OnInit {

  hideSubChallenge: boolean; // 隱藏子挑戰 vs 隱藏整個挑戰

  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: ChallengeReminderData,
    private challengeList: ChallengeListService,
    private snackRef: MatSnackBarRef<ChallengeReminderComponent>
  ) { }

  ngOnInit() {
    this.hideSubChallenge = !!this.data.subChallengeName;
  }

  recoverChallenge() {
    const subject: Subject<RecoverChallenge> = this.data.buying ?
      this.challengeList.buyingRecoverChallengeSubject : this.challengeList.sellingRecoverChallengeSubject;
    const recoverChallenge: RecoverChallenge = {
      challengeIndex: this.data.challengeIndex,
      subChallengeIndex: this.data.subChallengeIndex
    };
    subject.next(recoverChallenge);
    this.snackRef.dismiss();
  }

}


