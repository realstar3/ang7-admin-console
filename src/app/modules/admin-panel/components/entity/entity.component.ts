import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-entity',
  templateUrl: './entity.component.html',
  styleUrls: ['./entity.component.scss']
})
export class EntityComponent implements OnInit {
  @Input() showContent: boolean = false;
  @Input() entityName: String = '';
  @Input() entityFields: any[] = [];
  @Output() onBack: EventEmitter<any> = new EventEmitter();

  searchType: string = 'field';
  isSearch: boolean = false;
  searchValues: any[] = [];
  mock_records = [
    {
      id: 1,
      field1: 'aaa',
      field2: 'aaa',
      field3: 'aaa'
    },
    {
      id: 2,
      field1: 'bbb',
      field2: 'bbb',
      field3: 'bbb'
    },
    {
      id: 3,
      field1: 'ccc',
      field2: 'ccc',
      field3: 'ccc'
    },
    {
      id: 1,
      field1: 'aaa',
      field2: 'aaa',
      field3: 'aaa'
    },
    {
      id: 2,
      field1: 'bbb',
      field2: 'bbb',
      field3: 'bbb'
    },
    {
      id: 3,
      field1: 'ccc',
      field2: 'ccc',
      field3: 'ccc'
    },
    {
      id: 1,
      field1: 'aaa',
      field2: 'aaa',
      field3: 'aaa'
    },
    {
      id: 2,
      field1: 'bbb',
      field2: 'bbb',
      field3: 'bbb'
    },
    {
      id: 3,
      field1: 'ccc',
      field2: 'ccc',
      field3: 'ccc'
    }
  ];
  constructor() {}

  ngOnInit() {}

  handleBackClick() {
    this.onBack.emit();
  }

  changeKeyword(index: any) {
    // this.entityFields[index].keyword =
  }

  search() {
    const k: any[] = [];
    this.entityFields.forEach(field => {
      if (field.keyword !== '') {
        k.push({ name: field.name, value: field.keyword, operator: field.operation });
      }
    });
    const qury = '';
    this.isSearch = true;
  }

  editRecord(r: any) {
    alert(r);
  }

  deleteRecord(r: any) {
    alert(r);
  }

  changeOperationType(index: any) {
    if (this.entityFields[index].operation === 'AND') {
      this.entityFields[index].operation = 'OR';
    } else {
      this.entityFields[index].operation = 'AND';
    }
  }
}
