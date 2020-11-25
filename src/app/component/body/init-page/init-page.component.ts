import { Component, OnInit } from '@angular/core';
import { InitService } from '@service/init.service';
import { NavigatorService } from '@service/navigator.service';

@Component({
  selector: 'app-init-page',
  templateUrl: './init-page.component.html',
  styleUrls: ['./init-page.component.scss']
})
export class InitPageComponent implements OnInit {

  initMsg = 'Start initializing';

  constructor(
    private init: InitService,
    private navigator: NavigatorService
  ) { }

  ngOnInit() {
    this.init.initChallengeList();
    this.initMsg = 'Initialized';
    this.navigator.push('');
  }

}
