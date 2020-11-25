import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatExpansionModule, MatListModule } from '@angular/material';
import { MatSelectModule } from '@angular/material/select';
import { ModeRadioBtnModule } from '@component/shared/mode-radio-btn/mode-radio-btn.module';
import { TranslateModule } from '@ngx-translate/core';
import { NumbersOnlyModule } from '../directive/numbers-only/numbers-only.module';
import { RemoveLeadingZeroModule } from '../directive/remove-leading-zero/remove-leading-zero.module';
import { CenterButtonModule } from '../element/center-button/center-button.module';
import { LanguageService } from '../service/language/language.service';
import { CommonLinksComponent } from './common-links/common-links.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { PricingComponent } from './pricing/pricing.component';
import { SettingsComponent } from './settings/settings.component';
import { UnhideChallengesComponent } from './unhide-challenges/unhide-challenges.component';

@NgModule({
  declarations: [ConfirmComponent, PricingComponent, SettingsComponent, CommonLinksComponent, UnhideChallengesComponent],
  imports: [
    CommonModule,
    MatInputModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    CenterButtonModule,
    NumbersOnlyModule,
    RemoveLeadingZeroModule,
    MatSelectModule,
    ModeRadioBtnModule,
    MatExpansionModule,
    MatListModule
  ],
  entryComponents: [
    ConfirmComponent,
    PricingComponent,
    SettingsComponent,
    UnhideChallengesComponent,
    CommonLinksComponent
  ],
  providers: [
    LanguageService
  ]
})
export class DialogModule { }
