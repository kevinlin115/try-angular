import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { LanguageOptions } from 'src/conf/i18n-path';
import { LanguageService } from '../../service/language/language.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  languageOptions = LanguageOptions;
  currentLang = this.translate.currentLang;
  constructor(
    private dialogRef: MatDialogRef<SettingsComponent>,
    private translate: TranslateService,
    private languageService: LanguageService
  ) { }

  ngOnInit() {
  }

  confirm() {
    this.setLanguage();
    this.dialogRef.close();
  }

  private setLanguage() {
    this.languageService.setLanguage(this.currentLang);
  }

}
