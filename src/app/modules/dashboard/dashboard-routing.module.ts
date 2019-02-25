import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract, AuthenticationGuard } from '@app/core';
import { DashboardComponent } from './dashboard.component';
import { Shell } from '@app/modules/shell/shell.service';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'dashboard',
      component: DashboardComponent,
      data: { title: extract('Dashboard') },
      canActivate: [AuthenticationGuard]
    }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class DashboardRoutingModule {}
