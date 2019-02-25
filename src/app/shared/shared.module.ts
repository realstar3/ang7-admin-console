import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material';
import { NgbModule, NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';

import { LoaderComponent } from './loader/loader.component';
import { CheckboxComponent } from './checkbox/checkbox.component';

@NgModule({
  imports: [CommonModule, MatIconModule, NgbModule, NgbProgressbarModule],
  declarations: [LoaderComponent, CheckboxComponent],
  exports: [LoaderComponent, CheckboxComponent]
})
export class SharedModule {}
