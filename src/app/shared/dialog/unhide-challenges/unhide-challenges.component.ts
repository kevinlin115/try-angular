import { transition, trigger, useAnimation } from '@angular/animations';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HideDropdownMenuAnimation, ShowDropdownMenuAnimation } from '@animation/dropdown-menu';
import { SubChallenge } from '@class/challenge';
import { ChallengeListService } from '@service/challenge-list.service';
import { ConfirmDialogData } from '../confirm/confirm.component';
import { DialogService } from '../dialog.service';

export interface UnhideDialogData {
  hasHiddenChallenge: boolean;
}

@Component({
  selector: 'app-unhide-challenges',
  templateUrl: './unhide-challenges.component.html',
  styleUrls: ['./unhide-challenges.component.scss'],
  animations: [
    trigger('dropInOut', [
      transition(':enter', useAnimation(ShowDropdownMenuAnimation)),
      transition(':leave', useAnimation(HideDropdownMenuAnimation))
    ])
  ]
})
export class UnhideChallengesComponent implements OnInit {

  unhideTitle = 'DIALOG.TITLE.UNHIDE_CHALLENGE'; // 取消隱藏挑戰
  changed = false; // 有做過更動
  buyChallengeList: Array<Array<SubChallenge>> = [];
  sellChallengeList: Array<Array<SubChallenge>> = [];

  constructor(
    private challengeListService: ChallengeListService,
    private dialogService: DialogService,
    private dialogRef: MatDialogRef<UnhideChallengesComponent>,
    @Inject(MAT_DIALOG_DATA) private data: UnhideDialogData
  ) { }

  ngOnInit() {
    if (!this.data.hasHiddenChallenge) {
      this.unhideTitle = 'DIALOG.TITLE.NO_HIDDEN_CHALLENGE'; // 沒有隱藏的挑戰
      return;
    }
    this.buyChallengeList = this.challengeListService.getBuyingChallengeList();
    this.sellChallengeList = this.challengeListService.getSellingChallengeList();
    this.dialogRef.beforeClosed().subscribe(async () => {
      if (this.changed) {
        const data = new ConfirmDialogData('DIALOG.CONTENT.SAVE_CHANGE'); // TODO ADD I18N
        if (!!await this.dialogService.confirm(data)) {
          this.saveChange();
          this.challengeListService.changedSubject.next();
        }
      }
    });
  }

  hasHiddenChallenge(challengeList: Array<Array<SubChallenge>>) {
    return this.challengeListService.hasHiddenChallenge(challengeList);
  }

  // 檢查挑戰是否有隱藏的子挑戰
  hasHiddenSubchallenge(challenge: Array<SubChallenge>): boolean {
    return this.challengeListService.hasHiddenSubchallenge(challenge);
  }

  unhideChallenge(challenge: Array<SubChallenge>) {
    this.changed = true;
    challenge.forEach(subchallenge => {
      subchallenge.hidden = false;
    });
  }

  confirm() {
    if (!this.changed) {
      this.dialogRef.close();
      return;
    }
    this.saveChange();
    this.challengeListService.changedSubject.next();
    this.dialogRef.close();
  }

  private saveChange() {
    this.changed = false;
    this.challengeListService.updateBuyingChallengeList(this.buyChallengeList);
    this.challengeListService.updateSellingChallengeList(this.sellChallengeList);
  }
}
