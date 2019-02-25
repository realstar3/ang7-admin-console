import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreModule } from '@app/core/core.module';
import { SharedModule } from '@app/shared/shared.module';

import { ManagementsComponent } from './managements.component';
import { ManagementsRoutingModule } from './managements.routing.module';
import { ManagementsService } from './managements.service';

@NgModule({
  declarations: [ManagementsComponent],
  imports: [CommonModule, CoreModule, SharedModule, ManagementsRoutingModule],
  exports: [ManagementsComponent],
  providers: [ManagementsService]
})
export class ManagementsModule {}
