import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ConfirmComponent } from '../confirm/confirm.component';
export class PricingDialogData {
  pricingTitle = 'DIALOG.TITLE.PRICE_UR_CHALLENGE';

  // FOR EDIT
  originLeftPrice?: number;
  originRightPrice?: number;
}

export interface PriceData {
  c: number;
  ex: number;
}

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss']
})
export class PricingComponent implements OnInit {

  pricingForm: FormGroup;

  leftInput = 'c';
  rightInput = 'ex';
  leftInputWarn: string;
  rightInputWarn: string; // 右邊輸入框警示

  disableConfirm = true;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PricingDialogData
  ) { }

  ngOnInit() {
    // 數字檢核已經從directive控制
    this.pricingForm = this.formBuilder.group({
      ex: [null || this.data.originLeftPrice],
      c: [null || this.data.originRightPrice]
    });
    this.pricingForm.controls[this.leftInput].valueChanges.subscribe(() => {
      this.onLeftInputChange();
    });
    this.pricingForm.controls[this.rightInput].valueChanges.subscribe(() => {
      this.onRightInputChange();
    });
    this.updateDisableConfirm();
    // 使用debounceTime可能會造成貨幣 = 0
    // this.pricingForm.controls[this.rightInput].valueChanges.pipe(debounceTime(50)).subscribe(() => {
    //   this.onRightInputChange();
    //   this.updateDisableConfirm();
    // });
  }

  confirm() {
    if (!this.checkPriceExist()) {
      return;
    }
    const priceData: PriceData = {
      c: Number(this.pricingForm.get(this.leftInput).value) || 0, // || 0 可以去除 NaN
      ex: Number(this.pricingForm.get(this.rightInput).value) || 0
    };
    this.dialogRef.close(priceData);
  }

  /**
   * 檢查-價格有值 true
   */
  private checkPriceExist(): boolean {
    return (Number(this.pricingForm.get(this.leftInput).value) || 0) + (Number(this.pricingForm.get(this.rightInput).value) || 0) > 0;
  }

  onLeftInputChange() {
    if (this.pricingForm.controls[this.leftInput].valid) {
      this.leftInputWarn = null;
    }
    this.updateDisableConfirm();
  }

  onRightInputChange() {
    if (this.pricingForm.controls[this.rightInput].valid) {
      this.rightInputWarn = null;
    }
    this.updateDisableConfirm();
  }

  /**
   * 提醒只能輸入數字
   * @param type 0-left 1-right
   */
  onlyNumbersAllowed(type: number) {
    switch (type) {
      case 0:
        this.pricingForm.controls[this.leftInput].setErrors({ 'numbers-only': true });
        this.leftInputWarn = 'HINT.NUMBERS_ONLY';
        break;
      case 1:
        this.pricingForm.controls[this.rightInput].setErrors({ 'numbers-only': true });
        this.rightInputWarn = 'HINT.NUMBERS_ONLY';
        break;
    }
  }

  typingNumber(type: number) {
    switch (type) {
      case 0:
        this.pricingForm.controls[this.leftInput].setErrors({ 'numbers-only': false });
        this.leftInputWarn = null;
        break;
      case 1:
        this.pricingForm.controls[this.rightInput].setErrors({ 'numbers-only': false });
        this.rightInputWarn = null;
        break;
    }
  }

  private updateDisableConfirm() {
    let sum = 0;
    const value1 = this.pricingForm.controls[this.leftInput].value;
    const value2 = this.pricingForm.controls[this.rightInput].value;
    sum += isNaN(parseInt(value1, 10)) ? 0 : parseInt(value1, 10);
    sum += isNaN(parseInt(value2, 10)) ? 0 : parseInt(value2, 10);
    this.disableConfirm = sum <= 0;
  }

}
