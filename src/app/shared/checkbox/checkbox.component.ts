import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent implements OnInit {
  @Input() checked: boolean = false;
  @Output() onChangeAction: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {}

  onChange($event: any) {
    this.onChangeAction.emit($event.target.checked);
  }
}
