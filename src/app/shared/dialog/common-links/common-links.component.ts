import { Component, OnInit } from '@angular/core';
import { CommonLink, COMMON_LINKS } from './common-links';
@Component({
  selector: 'app-common-links',
  templateUrl: './common-links.component.html',
  styleUrls: ['./common-links.component.scss']
})
export class CommonLinksComponent implements OnInit {

  commonLinks: CommonLink[] = [];

  constructor() { }

  ngOnInit() {
    this.commonLinks = COMMON_LINKS;
    this.commonLinks.sort((a, b) => {
      if (a.displayName < b.displayName) {
        return -1;
      }
      return 1;
    });
  }

}
