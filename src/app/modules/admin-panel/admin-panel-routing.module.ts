import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract, AuthenticationGuard } from '@app/core';
import { AdminPanelComponent } from './admin-panel.component';
import { Shell } from '@app/modules/shell/shell.service';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'adminpanel',
      component: AdminPanelComponent,
      data: { title: extract('AdminPanel') },
      canActivate: [AuthenticationGuard]
    }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class AdminPanelRoutingModule {}
