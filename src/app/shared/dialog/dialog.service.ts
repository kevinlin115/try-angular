import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ConfirmComponent, ConfirmDialogData } from './confirm/confirm.component';
import { SubChallenge, PriceObj } from '@class/challenge';
import { PricingComponent, PricingDialogData } from './pricing/pricing.component';
import { SettingsComponent } from './settings/settings.component';
import { UnhideChallengesComponent, UnhideDialogData } from './unhide-challenges/unhide-challenges.component';
import { ChallengeListService } from '@service/challenge-list.service';
import { CommonLinksComponent } from './common-links/common-links.component';

@Injectable()
export class DialogService {

  constructor(
    private dialog: MatDialog,
    private challengeListService: ChallengeListService
  ) { }

  confirm(confirmDialogData: ConfirmDialogData): Promise<boolean> {
    return new Promise((resolve) => {
      const matDialogConfig: MatDialogConfig = {
        width: '20rem',
        height: 'fit-content',
        data: confirmDialogData
      };
      this.dialog.open(ConfirmComponent, matDialogConfig).afterClosed().subscribe((result: boolean) => {
        resolve(result);
      });
    });
  }

  /**
   * 幫物品定價對話框
   */
  pricing(data: PricingDialogData): Promise<SubChallenge['price']> {
    return new Promise((resolve) => {
      const matDialogConfig: MatDialogConfig = {
        width: 'fit-content',
        height: 'fit-content',
        data,
        backdropClass: ''
      };
      this.dialog.open(PricingComponent, matDialogConfig).afterClosed().subscribe((result: PriceObj) => {
        resolve(result);
      });
    });
  }

  settings(): Promise<any> {
    return new Promise(() => {
      const matDialogConfig: MatDialogConfig = {
        width: '25rem',
        height: 'fit-content',
      };
      this.dialog.open(SettingsComponent, matDialogConfig);
    });
  }

  unhideChallenges(): Promise<any> {
    const hasHiddenChallenge = this.challengeListService.hasHiddenChallenge(this.challengeListService.getBuyingChallengeList()) ||
      this.challengeListService.hasHiddenChallenge(this.challengeListService.getSellingChallengeList());
    const data: UnhideDialogData = {
      hasHiddenChallenge
    };
    return new Promise((resolve) => {
      const matDialogConfig: MatDialogConfig = {
        width: '30rem',
        height: hasHiddenChallenge ? '85vh' : 'fit-content',
        data
      };
      this.dialog.open(UnhideChallengesComponent, matDialogConfig);
    });
  }

  commonLinks(): Promise<any> {
    return new Promise(() => {
      const matDialogConfig: MatDialogConfig = {
        width: '25rem',
        height: 'fit-content',
        autoFocus: false
      };
      this.dialog.open(CommonLinksComponent, matDialogConfig);
    });
  }
}
