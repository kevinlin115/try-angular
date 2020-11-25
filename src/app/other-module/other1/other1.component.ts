import { Component, OnInit } from '@angular/core';
import { OtherService } from '../other.service';

@Component({
  selector: 'app-other1',
  templateUrl: './other1.component.html',
  styleUrls: ['./other1.component.scss']
})
export class Other1Component implements OnInit {

  constructor(
    private other1: OtherService
  ) { }

  ngOnInit() {
  }

}
