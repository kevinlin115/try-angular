import { AfterViewInit, Component, OnInit, QueryList, ViewChild, ViewChildren, ViewEncapsulation } from '@angular/core';
import { MatTab, MatTabGroup } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorageItem, LocalStorageService, Miscs } from '@service/local-storage.service';
import { ChallengeListComponent } from '../../shared/challenge-list/challenge-list.component';
import { InitService } from '@service/init.service';
import { NavigatorService } from '@service/navigator.service';
import { FooterObj } from '@component/footer/footer.component';
import { LanguageService } from 'src/app/shared/service/language/language.service';
import { OtherService } from 'src/app/other-module/other.service';

export enum TradingType {
  'Buying' = 0,
  'Selling' = 1
}
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomePageComponent implements OnInit, AfterViewInit {

  @ViewChild(MatTabGroup, { static: false }) tabGroup: MatTabGroup; // static為true：只會在oninit取得element
  @ViewChild(MatTab, { static: false }) matTab: MatTab;
  @ViewChildren(ChallengeListComponent) challengeListArray: QueryList<ChallengeListComponent>;
  // https://www.clipartwiki.com/clipimg/full/140-1409221_spending-money-clipart-expense-png-icon.png
  // public buyingIcon = '../../../../assets/icon/buying.png';
  // http://cdn.onlinewebfonts.com/svg/img_452038.png
  // public sellingIcon = '../../../../assets/icon/selling.png';

  /**
   * template要使用enum必須加入此function
   */
  get TradingType() {
    return TradingType;
  }

  testBase = '123';

  tradingType: TradingType = 0;
  // miscs: Miscs = new Miscs();
  footerObj: FooterObj = new FooterObj();

  constructor(
    private translate: TranslateService,
    private localStorage: LocalStorageService,
    private init: InitService,
    private navigator: NavigatorService,
    private languageService: LanguageService,
    private other1: OtherService
  ) { }

  ngOnInit() {
    if (!this.init.hasInit()) {
      this.navigator.push('init');
      return;
    }
    this.tradingType = Number(this.localStorage.get(LocalStorageItem.defaultTradingType)) || TradingType.Buying;
    this.languageService.initLanguage();
    this.footerObj = new FooterObj();
  }

  ngAfterViewInit(): void {
    // 更換買進 or 賣出
    this.tabGroup.selectedIndexChange.subscribe(index => {
      this.tradingType = index;
      this.localStorage.set(LocalStorageItem.defaultTradingType, this.tradingType);
    });
  }

  onModeChange(e) {
    this.footerObj.mode = e;
    console.error(e);
  }

  test() {
    this.navigator.push(`other-module`);
  }

}

