import { Component, OnInit, forwardRef } from '@angular/core';
import { NgmodelBaseComponent } from '@component/shared/ngmodel-base/ngmodel-base.component';
import { Subject } from 'rxjs';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

export const TEST_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  // tslint:disable-next-line: no-use-before-declare
  useExisting: forwardRef(() => TestComponent),
  multi: true
};

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
  providers: [TEST_VALUE_ACCESSOR]
})
export class TestComponent extends NgmodelBaseComponent implements OnInit {
  inputSubject: Subject<any> = new Subject();
  constructor() {
    super();
  }

  ngOnInit() {
    this.inputSubject.subscribe(() => {
      this.setModel(this.value);
    });
  }

  showTestComponent() {
    console.log(this.value)
  }

}
