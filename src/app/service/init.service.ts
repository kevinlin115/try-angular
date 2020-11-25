import { Injectable } from '@angular/core';
import { LocalStorageService, LocalStorageKeyStash } from './local-storage.service';
import { DefaultChallengeList } from 'src/app/class/challenge';

@Injectable({
  providedIn: 'root'
})
export class InitService {

  constructor(
    private localStorage: LocalStorageService
  ) { }

  hasInit(): boolean {
    const buyingChallengeList = this.localStorage.getObj(LocalStorageKeyStash.buyingChallengeList);
    const sellingChallengeList = this.localStorage.getObj(LocalStorageKeyStash.sellingChallengeList);
    return !!buyingChallengeList && !!sellingChallengeList;
  }

  initChallengeList() {
    this.localStorage.setObj(LocalStorageKeyStash.buyingChallengeList, DefaultChallengeList);
    this.localStorage.setObj(LocalStorageKeyStash.sellingChallengeList, DefaultChallengeList);
  }
}
