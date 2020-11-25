import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatFormFieldModule } from '@angular/material';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModeRadioBtnModule } from '@component/shared/mode-radio-btn/mode-radio-btn.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { SnackBarService } from '@sharedPopup/snack-bar/snack-bar.service';
import 'hammerjs';
import { MultiTranslateHttpLoader } from 'ngx-translate-multi-http-loader';
import { I18nPath } from 'src/conf/i18n-path';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './component/body/home-page/home-page.component';
import { InitPageComponent } from './component/body/init-page/init-page.component';
import { FooterComponent } from './component/footer/footer.component';
import { HeaderComponent } from './component/header/header.component';
import { ChallengeListComponent } from './component/shared/challenge-list/challenge-list.component';
import { MainBarComponent } from './component/shared/main-bar/main-bar.component';
import { TestComponent } from './component/test/test.component';
import { DialogModule } from './shared/dialog/dialog.module';
import { DialogService } from './shared/dialog/dialog.service';
import { SnackBarModule } from './shared/popup/snack-bar/snack-bar.module';
import { OtherModuleModule } from './other-module/other-module.module';
import { OtherService } from './other-module/other.service';

export function HttpLoaderFactory(http: HttpClient) {
  return new MultiTranslateHttpLoader(http, I18nPath);
}

const materialModules = [
  MatExpansionModule,
  MatFormFieldModule,
  MatTabsModule,
  MatIconModule,
  MatBadgeModule,
  MatButtonModule,
  MatDividerModule,
  MatListModule,
  MatTooltipModule,
  MatSnackBarModule,
  MatDialogModule
];
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomePageComponent,
    ChallengeListComponent,
    InitPageComponent,
    MainBarComponent,
    TestComponent
  ],
  imports: [
    // OtherModuleModule,
    BrowserAnimationsModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    materialModules,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    SnackBarModule,
    DialogModule,
    ModeRadioBtnModule
  ],
  providers: [
    SnackBarService,
    DialogService,
    OtherService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
