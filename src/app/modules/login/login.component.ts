import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { recul } from 'recul';

import { environment } from '@env/environment';
import { Logger, I18nService } from '@app/core';
import { LoginService } from './login.service';

const log = new Logger('Login');

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild('tooltipEmailRef') tooltipEmailRef: any;
  @ViewChild('tooltipPasswordRef') tooltipPasswordRef: any;
  version: string = environment.version;
  error: string;
  loginForm: FormGroup;
  isLoading: boolean = false;
  emailTooltipText: string = '';
  passwordTooltipText: string = '';
  errorTooltipPlacement: string = 'bottom';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private i18nService: I18nService,
    private loginSrv: LoginService
  ) {
    this.createForm();
  }

  ngOnInit() {}

  login() {
    const { username, password } = this.loginForm.value;
    let isError = false;
    this.loginForm.controls['username'].setErrors(null);
    this.loginForm.controls['password'].setErrors(null);
    this.tooltipEmailRef.close();
    this.tooltipPasswordRef.close();
    this.emailTooltipText = '';
    this.passwordTooltipText = '';

    // this.tips.map(tip => tip.destroy()).length = 0;

    if (!username) {
      this.loginForm.controls['username'].setErrors({ incorrect: true });
      isError = true;
    }

    if (!password) {
      this.loginForm.controls['password'].setErrors({ incorrect: true });
      isError = true;
    }

    if (isError) {
      return;
    }

    this.isLoading = true;
    this.loginSrv
      .login(this.loginForm.value)
      .pipe(
        finalize(() => {
          this.loginForm.markAsPristine();
          this.isLoading = false;
        })
      )
      .subscribe(
        credentials => {
          log.debug('successfully logged in', credentials);
          recul.setValue('LOADER', 0);
          this.getUser();
        },
        error => {
          log.debug('Login error:', error);
          recul.setValue('LOADER', -1);
          switch (error.status) {
            case 400:
              this.emailTooltipText = 'Please check your "Username"';
              this.tooltipEmailRef.open();
              this.loginForm.controls['username'].setErrors({ incorrect: true });

              this.passwordTooltipText = 'Please check your "Password"';
              this.tooltipPasswordRef.open();
              this.loginForm.controls['password'].setErrors({ incorrect: true });
              break;

            case 401:
              this.emailTooltipText = 'User not activated';
              this.tooltipEmailRef.open();
              this.loginForm.controls['username'].setErrors({ incorrect: true });
              break;

            case 403:
              this.passwordTooltipText = 'Password wrong';
              this.tooltipPasswordRef.open();
              this.loginForm.controls['password'].setErrors({ incorrect: true });
              break;

            case 404:
              this.emailTooltipText = 'User name Not Found';
              this.tooltipEmailRef.open();
              this.loginForm.controls['username'].setErrors({ incorrect: true });
              break;

            default:
          }
        }
      );
  }

  getUser() {
    this.loginSrv.getUser().subscribe(
      user => {
        recul.setValue('LOADER', 33);
        log.debug('successfully get user', user);
        this.route.queryParams.subscribe(params =>
          this.router.navigate([params.redirect || '/adminpanel'], { replaceUrl: true })
        );
      },
      error => {
        log.debug(`Login error: ${error}`);
        recul.setValue('LOADER', -1);
        this.error = error;
      }
    );
  }

  setLanguage(language: string) {
    this.i18nService.language = language;
  }

  isEmptyForm() {
    return !this.loginForm.controls.username.value && !this.loginForm.controls.password.value;
  }

  onChangeRememberMe(rememberMe: boolean) {
    this.loginForm.patchValue({ rememberMe });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.errorTooltipPlacement = event.target.innerWidth < 768 ? 'bottom' : 'right';
  }

  get currentLanguage(): string {
    return this.i18nService.language;
  }

  get languages(): string[] {
    return this.i18nService.supportedLanguages;
  }

  private createForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      rememberMe: true
    });
  }
}
