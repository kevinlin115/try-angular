import { Injectable } from '@angular/core';

// LocalStorage key stash for obj
export enum LocalStorageKeyStash {
  buyingChallengeList = 'buyingChallengeList',
  sellingChallengeList = 'sellingChallengeList'
}

// LocalStorage key stash for single item
export enum LocalStorageItem {
  defaultTradingType = 'defaultTradingType'
}

export const MiscsLocalStorageKey = 'Miscs';
export class Miscs {
  expanded: boolean;
  language: string;
  constructor() {
    this.expanded = true;
  }
}

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  set(key: string, value: string | any) {
    localStorage.setItem(key, String(value));
  }

  get(key: string): any {
    return localStorage.getItem(key);
  }

  setObj(key: string, value: object) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getObj(key: string): any {
    return JSON.parse(localStorage.getItem(key));
  }
}
