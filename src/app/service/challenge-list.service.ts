import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { RecoverChallenge } from '@sharedPopup/snack-bar/challenge-reminder/challenge-reminder.component';
import { LocalStorageService, LocalStorageKeyStash } from './local-storage.service';
import { SubChallenge } from '@class/challenge';

@Injectable({
  providedIn: 'root'
})
export class ChallengeListService {

  buyingRecoverChallengeSubject: Subject<RecoverChallenge> = new Subject();
  sellingRecoverChallengeSubject: Subject<RecoverChallenge> = new Subject();
  changedSubject: Subject<any> = new Subject(); // 有更動challenge list

  constructor(
    private localStorage: LocalStorageService
  ) { }

  getBuyingChallengeList(): Array<Array<SubChallenge>> {
    return this.localStorage.getObj(LocalStorageKeyStash.buyingChallengeList);
  }

  updateBuyingChallengeList(challengeList: Array<Array<SubChallenge>>) {
    this.localStorage.setObj(LocalStorageKeyStash.buyingChallengeList, challengeList);
  }

  getSellingChallengeList() {
    return this.localStorage.getObj(LocalStorageKeyStash.sellingChallengeList);
  }

  updateSellingChallengeList(challengeList: Array<Array<SubChallenge>>) {
    this.localStorage.setObj(LocalStorageKeyStash.sellingChallengeList, challengeList);
  }

  // 檢查是否有隱藏的挑戰
  hasHiddenChallenge(challengeList: Array<Array<SubChallenge>>): boolean {
    return challengeList.filter(challenge => this.hasHiddenSubchallenge(challenge)).length > 0;
  }

  // 檢查挑戰是否有隱藏的子挑戰
  hasHiddenSubchallenge(challenge: Array<SubChallenge>): boolean {
    return challenge.filter(subChallenge => subChallenge.hidden).length > 0;
  }

}
