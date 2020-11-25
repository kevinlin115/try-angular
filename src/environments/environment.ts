// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  onAlertHideChallenge: 2, // 挑戰筆數超過此數需先提示
  matTooltipShowDelay: 500, // 顯示挑戰詳細敘述延遲豪秒數
  snackBarDuration: 3000, // 提醒顯示毫秒數
  animationDuration: '300ms', // 動畫時間
  serverUrl: '',
  wsServerUrl: 'ws://localhost:8080/ws',
  production: false
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
