import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatExpansionPanel } from '@angular/material';
import { LocalStorageService, Miscs, MiscsLocalStorageKey } from '@service/local-storage.service';
import { DialogService } from 'src/app/shared/dialog/dialog.service';

@Component({
  selector: 'app-main-bar',
  templateUrl: './main-bar.component.html',
  styleUrls: ['./main-bar.component.scss']
})
export class MainBarComponent implements OnInit, AfterViewInit {

  @ViewChild(MatExpansionPanel, { static: false }) expansionPanel: MatExpansionPanel;
  miscs: Miscs = null;

  constructor(
    private dialogService: DialogService,
    private localStorage: LocalStorageService
  ) { }

  ngOnInit() {
    const savedMiscs = this.localStorage.getObj(MiscsLocalStorageKey);
    this.miscs = !!savedMiscs ? savedMiscs : new Miscs();
  }

  ngAfterViewInit() {
    this.expansionPanel.expandedChange.subscribe(expanded => {
      this.saveMainBarExpanded(expanded);
    });
  }

  saveMainBarExpanded(expanded: boolean) {
    this.miscs.expanded = expanded;
    this.localStorage.setObj(MiscsLocalStorageKey, this.miscs);
  }

  openSettings() {
    this.dialogService.settings();
  }

  unhideChallenges() {
    this.dialogService.unhideChallenges();
  }

  commonLinks() {
    this.dialogService.commonLinks();
  }

}
