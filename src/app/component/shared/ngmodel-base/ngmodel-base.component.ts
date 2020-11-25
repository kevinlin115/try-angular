import { OnInit } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

export abstract class NgmodelBaseComponent implements OnInit, ControlValueAccessor {

  value = null;

  // SelectControlValueAccessor 類型所需
  onTouchedCallback: () => {};
  onChangeCallback: (_: any) => {};

  get model(): any {
    return this.value;
  }

  set model(newValue) {
    this.value = newValue;
  }

  setModel(newValue) {
    this.value = newValue;
    this.onChangeCallback(this.value); // 不加這行的話 parent variable不會隨著更新
  }

  constructor() { }

  ngOnInit() {
  }

  // SelectControlValueAccessor 類型所需
  writeValue(value: any): void {
    this.value = value || null;
  }

  // SelectControlValueAccessor 類型所需
  registerOnChange(fn: (_: any) => {}): void {
    this.onChangeCallback = fn;
  }

  // SelectControlValueAccessor 類型所需
  registerOnTouched(fn: () => {}): void {
    this.onTouchedCallback = fn;
  }

  // SelectControlValueAccessor 類型所需
  setDisabledState(isDisabled: boolean): void {
    // this.disabled = isDisabled;
  }

}
