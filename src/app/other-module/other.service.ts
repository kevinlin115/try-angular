import { Injectable } from '@angular/core';

@Injectable()
export class OtherService {

  constructedTime;

  constructor() {
    console.error(`other service constructed`);
    this.constructedTime = String(new Date().getMinutes()) + String(new Date().getSeconds());
    console.error(`${this.constructedTime}`);
  }
}
