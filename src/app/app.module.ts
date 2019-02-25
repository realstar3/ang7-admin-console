import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule, NgbTooltipModule, NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { HomeModule } from './modules/home/home.module';
import { ShellModule } from './modules/shell/shell.module';
import { LoginModule } from './modules/login/login.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { AdminPanelModule } from './modules/admin-panel/admin-panel.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ManagementsModule } from './modules/managements/managements.module';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    TranslateModule.forRoot(),
    NgbModule,
    NgbTooltipModule,
    NgbProgressbarModule,
    CoreModule,
    SharedModule,
    ShellModule,
    HomeModule,
    LoginModule,
    DashboardModule,
    AdminPanelModule,
    ManagementsModule,
    AppRoutingModule // must be imported as the last module as it contains the fallback route
  ],
  declarations: [AppComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
