import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Logger, AuthenticationService, I18nService } from '@app/core';
import { LoginService } from '@app/modules/login/login.service';
import { SharedService } from '../../../shared/shared.service';

const log = new Logger('Login');

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  currentUser: any = null;
  menuHidden = false;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private i18nService: I18nService,
    private sharedService: SharedService,
    private loginService: LoginService
  ) {}

  ngOnInit() {
    this.loginService.getUser().subscribe(
      user => {
        if (user.body.firstName) {
          this.currentUser = user.body;
        }
      },
      error => {
        log.debug(`Account error: ${error}`);
      }
    );
  }

  toggleMenu() {
    this.menuHidden = !this.menuHidden;
    this.sharedService.setMenuHidden(this.menuHidden);
  }

  setLanguage(language: string) {
    this.i18nService.language = language;
  }

  logout() {
    this.authenticationService.logout().subscribe(() => this.router.navigate(['/login'], { replaceUrl: true }));
  }

  isAdminpanel() {
    return this.router.url.includes('adminpanel');
  }

  get currentLanguage(): string {
    return this.i18nService.language;
  }

  get languages(): string[] {
    return this.i18nService.supportedLanguages;
  }

  get username(): string | null {
    const credentials = this.authenticationService.credentials;
    return credentials ? credentials.username : null;
  }
}
