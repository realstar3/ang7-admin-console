import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

import { CoreModule } from '@app/core/core.module';
import { SharedModule } from '@app/shared/shared.module';
import { DashboardModule } from '../dashboard/dashboard.module';

import { AdminPanelComponent } from './admin-panel.component';
import { AdminPanelRoutingModule } from './admin-panel-routing.module';

import { AdminPanelService } from './admin-panel.service';
import { EntityComponent } from './components';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AdminPanelComponent, EntityComponent],
  imports: [CommonModule, CoreModule, SharedModule, AdminPanelRoutingModule, DashboardModule, NgbModule, FormsModule],
  providers: [AdminPanelService]
})
export class AdminPanelModule {}
