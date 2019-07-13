import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-btn',
  templateUrl: './btn.component.html',
  styleUrls: ['./btn.component.scss']
})
export class BtnComponent implements OnInit {

  @Input() disabled: boolean;
  @Input() value: string;
  @Input() type: 'primary' | 'secondary' = 'primary';

  @Output() btnClick: EventEmitter<void> = new EventEmitter();

  constructor() { }

  ngOnInit() {

  }


}