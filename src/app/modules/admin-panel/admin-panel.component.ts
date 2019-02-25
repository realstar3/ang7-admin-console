import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { recul } from 'recul';

import { Logger } from '@app/core';
import { SharedService } from '@app/shared/shared.service';
import { AdminPanelService } from './admin-panel.service';

const log = new Logger('AdminPanel');

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {
  managementNames: any[] = [];
  childmanagementNames: any[] = [];
  showDashboard: Boolean = false;
  currentmanagementName: String = 'Dashboard';
  adminlevel = 0;
  showChildContent: Boolean = false;
  currentEntityName: String = '';
  currentEntityFields: any[] = [];

  constructor(
    private adminpanelSrv: AdminPanelService,
    private router: Router,
    private route: ActivatedRoute,
    private sharedService: SharedService
  ) {}

  ngOnInit() {
    recul.setValue('LOADER', 66);
    this.getManagementNames();
  }

  getManagementNames() {
    this.adminlevel = 1;
    if (!this.adminpanelSrv || !this.adminpanelSrv.getManagementNames) {
      return;
    }
    this.adminpanelSrv.getManagementNames().subscribe(managementNames => {
      recul.setValue('LOADER', 100);
      this.managementNames = managementNames.body;
    });
    this.showDashboard = false;
  }

  getChildManagementNames(managentName: any) {
    this.adminlevel = 2;
    this.currentmanagementName = managentName;
    if (!this.adminpanelSrv || !this.adminpanelSrv.getChildManagementNames) {
      return;
    }
    this.adminpanelSrv
      .getChildManagementNames(managentName)
      .subscribe(managementNames => (this.childmanagementNames = managementNames.body));
    this.showDashboard = true;
    this.currentEntityName = this.currentmanagementName;
  }

  handleEntityManagementClick() {
    this.showDashboard = true;
    this.currentEntityName = this.currentmanagementName;
  }

  getEntityFields(entityName: any) {
    this.showDashboard = false;
    this.currentEntityName = entityName;
    this.adminpanelSrv.getEntityFields(entityName).subscribe(entityFields => {
      entityFields.body.forEach((field: any) => {
        field['operation'] = 'AND';
        field['keyword'] = '';
      });
      this.currentEntityFields = entityFields.body;
    });
  }

  isMenuHidden() {
    return this.sharedService.isMenuHidden();
  }

  handleBack() {
    this.adminlevel = 1;
    this.showDashboard = true;
    this.currentmanagementName = 'Dashboard';
  }
}
