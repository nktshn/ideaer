import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-btn',
  templateUrl: './btn.component.html',
  styleUrls: ['./btn.component.scss']
})
export class BtnComponent implements OnInit {

  @Input() disabled: boolean;
  @Input() value: string;

  constructor() { }

  ngOnInit() {
  }

}
