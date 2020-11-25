import { Injectable } from '@angular/core';
import { LocalStorageService, MiscsLocalStorageKey, Miscs } from '@service/local-storage.service';
import { TranslateService } from '@ngx-translate/core';

export const DefaultLanguage = 'en-us';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor(
    private localStorage: LocalStorageService,
    private translate: TranslateService
  ) { }

  initLanguage() {
    const miscs = this.getLocalMiscs();
    if (!!miscs.language) {
      this.translate.use(miscs.language);
    } else {
      this.translate.use(DefaultLanguage);
    }
  }

  setLanguage(key: string) {
    this.translate.use(key);
    const miscs = this.getLocalMiscs();
    miscs.language = key;
    this.localStorage.setObj(MiscsLocalStorageKey, miscs);
  }

  private getLocalMiscs(): Miscs {
    const miscs = this.localStorage.getObj(MiscsLocalStorageKey);
    if (!miscs) {
      return new Miscs();
    }
    return miscs;
  }

}
