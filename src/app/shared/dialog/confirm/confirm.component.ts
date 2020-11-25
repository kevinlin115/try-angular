import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
export class ConfirmDialogData {
  confirmTitle = 'DIALOG.TITLE.CONFIRM'; // 確認
  confirmContent: string; // 未做過i18n字串
  confirmContentObj?: any; // 如需塞值給confirmContent
  leftBtn = 'BUTTON.NO';
  rightBtn = 'BUTTON.YES';
  constructor(content?: string, confirmContentObj?: any) {
    this.confirmContent = content;
    this.confirmContentObj = confirmContentObj;
  }
}
@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    this.translate.get(this.data.confirmContent, this.data.confirmContentObj).subscribe(result => {
      this.data.confirmContent = result;
    });
  }

  onLeftBtnClick() {
    this.dialogRef.close(false);
  }

  onRightBtnClick() {
    this.dialogRef.close(true);
  }

}
