import { Component, OnInit } from '@angular/core';
import { Logger } from '@app/core';
import { DashboardService } from './dashboard.service';

const log = new Logger('Dashboard');

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  countries: any[] = [
    {
      id: 1,
      name: 'Germany',
      flag: 'f/f3/Flag_of_Germany.svg',
      area: 357386,
      population: 82979100
    },
    {
      id: 2,
      name: 'Canada',
      flag: 'c/cf/Flag_of_Canada.svg',
      area: 9976140,
      population: 36624199
    },
    {
      id: 3,
      name: 'United States',
      flag: 'a/a4/Flag_of_the_United_States.svg',
      area: 9629091,
      population: 324459463
    },
    {
      id: 4,
      name: 'China',
      flag: 'f/fa/Flag_of_the_People%27s_Republic_of_China.svg',
      area: 9596960,
      population: 1409517397
    }
  ];
  managementNames: any[] = [];

  constructor(private dashboardSrv: DashboardService) {}

  ngOnInit() {
    this.getManagementNames();
  }

  getManagementNames() {
    if (!this.dashboardSrv || !this.dashboardSrv.getManagementNames) {
      return;
    }

    // this.dashboardSrv.getManagementNames().subscribe(managementNames => (this.managementNames = managementNames));
  }

  onSort({ column, direction }: any) {
    log.debug('onSort', column, direction);

    // // resetting other headers
    // this.headers.forEach(header => {
    //   if (header.sortable !== column) {
    //     header.direction = '';
    //   }
    // });
    //
    // // sorting countries
    // if (direction === '') {
    //   this.countries = COUNTRIES;
    // } else {
    //   this.countries = [...COUNTRIES].sort((a, b) => {
    //     const res = compare(a[column], b[column]);
    //     return direction === 'asc' ? res : -res;
    //   });
    // }
  }
}
