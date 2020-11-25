import { transition, trigger, useAnimation } from '@angular/animations';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { HideDropdownMenuAnimation, ShowDropdownMenuAnimation } from '@animation/dropdown-menu';
import { TranslateService } from '@ngx-translate/core';
import { ChallengeListService } from '@service/challenge-list.service';
import { ChallengeReminderData, RecoverChallenge } from '@sharedPopup/snack-bar/challenge-reminder/challenge-reminder.component';
import { SnackBarService } from '@sharedPopup/snack-bar/snack-bar.service';
import { Subscription } from 'rxjs';
import { SubChallenge } from 'src/app/class/challenge';
import { ConfirmDialogData } from 'src/app/shared/dialog/confirm/confirm.component';
import { DialogService } from 'src/app/shared/dialog/dialog.service';
import { PricingDialogData } from 'src/app/shared/dialog/pricing/pricing.component';
import { environment } from 'src/environments/environment';

export interface HideChallengeConfirmObj {
  challengeName: string;
  countSubChallenge: number;
}
@Component({
  selector: 'app-challenge-list',
  templateUrl: './challenge-list.component.html',
  styleUrls: ['./challenge-list.component.scss'],
  animations: [
    trigger('dropInOut', [
      transition(':enter', useAnimation(ShowDropdownMenuAnimation)),
      transition(':leave', useAnimation(HideDropdownMenuAnimation))
    ])
  ]
})
export class ChallengeListComponent implements OnInit, OnDestroy {

  get environment() { return environment; }

  @Input() buying: boolean;
  challengeList: Array<Array<SubChallenge>>;
  hideChallengeConfirmI18n = 'DIALOG.CONTENT.HIDE_CHALLENGE_CONFIRM';
  recoverChallengeSubscription: Subscription;

  constructor(
    private snackBarService: SnackBarService,
    private dialogService: DialogService,
    private translate: TranslateService,
    private challengeListService: ChallengeListService
  ) { }

  ngOnInit() {
    this.getChallengeList();
    const subject = this.buying ?
      this.challengeListService.buyingRecoverChallengeSubject : this.challengeListService.sellingRecoverChallengeSubject;
    this.recoverChallengeSubscription = subject.subscribe(recoverChallenge => {
      this.recoverChallenge(recoverChallenge);
    });

    this.challengeListService.changedSubject.subscribe(() => {
      // 重新取得challenge list
      this.getChallengeList();
    });
  }

  ngOnDestroy() {
    this.recoverChallengeSubscription.unsubscribe();
  }

  private getChallengeList() {
    this.challengeList = this.buying ?
      this.challengeListService.getBuyingChallengeList() : this.challengeListService.getSellingChallengeList();
  }

  /**
   *
   * @param challenge
   */
  showSubChallengeBadge(challenge: Array<SubChallenge>): boolean {
    return challenge.filter(element => element.selected && !element.hidden).length > 0;
  }


  /**
   * 取得某筆挑戰中已選取的子挑戰
   */
  getSelectedSubChallenge(challenge: Array<SubChallenge>): string {
    return String(challenge.filter(element => element.selected && !element.hidden).length);
  }

  /**
   * 取得 已選取子挑戰/已顯示子挑戰
   * @param challenge 該挑戰
   */
  getSelectedSubChallengeRatio(challenge: Array<SubChallenge>): string {
    return String(challenge.filter(element => element.selected && !element.hidden).length) + '/'
      + String(challenge.filter(element => !element.hidden).length);
  }

  /**
   * 點選某筆子挑戰
   * @param subChallenge subChallenge
   */
  async onCheckSubchallenge(subChallenge: SubChallenge) {
    if (!subChallenge.selected && !this.buying && !subChallenge.price) {
      const pricingDialogData = new PricingDialogData();
      const pricingRes = await this.dialogService.pricing(pricingDialogData);
      if (!pricingRes) {
        return;
      }
      subChallenge.price = pricingRes;
    }
    subChallenge.selected = !subChallenge.selected;
    this.updateChallengeListToLocalStorage();
  }

  /**
   * 更新challenge list 到local storage
   */
  updateChallengeListToLocalStorage() {
    this.buying ?
      this.challengeListService.updateBuyingChallengeList(this.challengeList) :
      this.challengeListService.updateSellingChallengeList(this.challengeList);
    // this.localStorage.setObj(this.getLocalStorageKey(), this.challengeList);
  }

  async hideChallenge(challenge: Array<SubChallenge>, challengeIndex: number) {
    const challengeTitle = await this.getChallengeTitle(challengeIndex);
    if (this.getShowedSubChallengeCount(challenge) > environment.onAlertHideChallenge) {
      const hideChallengeConfirmObj: HideChallengeConfirmObj = {
        challengeName: challengeTitle,
        countSubChallenge: challenge.length
      };
      const confirmDialogData = new ConfirmDialogData(this.hideChallengeConfirmI18n, hideChallengeConfirmObj);
      // this.translate.get(this.hideChallengeConfirmI18n, hideChallengeConfirmObj).subscribe(result => {
      //   confirmDialogData.confirmContent = result;
      // });
      if (!await this.dialogService.confirm(confirmDialogData)) {
        return;
      }
    }
    challenge.forEach(subChallenge => {
      subChallenge.hidden = true;
    });
    const challengeReminderData: ChallengeReminderData = {
      buying: this.buying,
      challengeName: challengeTitle,
      challengeIndex
    };
    this.snackBarService.challengeReminder(challengeReminderData);
    this.updateChallengeListToLocalStorage();
  }

  async hideSubChallenge(subChallenge: SubChallenge, subChallengeIndex: number, challengeIndex: number) {
    const challengeTitle = await this.getChallengeTitle(challengeIndex);
    const subChallengeTitle = await this.getSubChallengeTitle(subChallenge);
    const challengeReminderData: ChallengeReminderData = {
      buying: this.buying,
      challengeName: challengeTitle,
      challengeIndex,
      subChallengeName: subChallengeTitle,
      subChallengeIndex
    };
    this.snackBarService.challengeReminder(challengeReminderData);
    subChallenge.hidden = true;
    this.updateChallengeListToLocalStorage();
  }

  /**
   * 復原隱藏的挑戰(或子挑戰)
   */
  recoverChallenge(recoverChallenge: RecoverChallenge) {
    // 子挑戰判斷
    if (typeof recoverChallenge.subChallengeIndex !== 'undefined') {
      this.challengeList[recoverChallenge.challengeIndex][recoverChallenge.subChallengeIndex].hidden = false;
    } else {
      this.challengeList[recoverChallenge.challengeIndex].forEach(subChallenge => {
        subChallenge.hidden = false;
      });
    }
    this.updateChallengeListToLocalStorage();
  }

  showChallenge(challenge: Array<SubChallenge>): boolean {
    return challenge.filter(subChallenge => !subChallenge.hidden).length > 0;
  }

  async editPrice(subChallenge: SubChallenge) {
    const pricingDialogData = new PricingDialogData();
    pricingDialogData.pricingTitle = 'DIALOG.TITLE.REPRICE_UR_CHALLENGE';
    pricingDialogData.originLeftPrice = subChallenge.price.ex;
    pricingDialogData.originRightPrice = subChallenge.price.c;
    const pricingRes = await this.dialogService.pricing(pricingDialogData);
    if (!pricingRes) {
      return;
    }
    subChallenge.price = pricingRes;
  }

  private getChallengeTitle(i: number): Promise<string> {
    return new Promise((resolve) => {
      this.translate.get(`CHALLENGE.${i}.TITLE`).subscribe((result: string) => {
        resolve(result);
      });
    });
  }

  private getSubChallengeTitle(subChallenge: SubChallenge): Promise<string> {
    return new Promise((resolve) => {
      this.translate.get(`SUB_CHALLENGE.${subChallenge.name}`).subscribe((result: string) => {
        resolve(result);
      });
    });
  }

  private getShowedSubChallengeCount(challenge: Array<SubChallenge>): number {
    return challenge.filter(subChallenge => !subChallenge.hidden).length;
  }

}
