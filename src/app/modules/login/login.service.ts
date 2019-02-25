import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpService, AuthenticationService, Logger } from '@app/core';

const log = new Logger('LoginService');

@Injectable({ providedIn: 'root' })
export class LoginService {
  constructor(private http: HttpService, private authSrv: AuthenticationService) {}

  login(credentials: any): Observable<any> {
    const data = {
      username: credentials.username,
      password: credentials.password,
      rememberMe: credentials.rememberMe
    };

    return this.http.post('/api/authenticate', data, { observe: 'response' }).pipe(
      map((response: any) => {
        const token = response.body.id_token;

        log.debug('login', 'token', token, 'response', response);

        if (token) {
          this.authSrv.login({
            ...data,
            permissions: response.privileges,
            roles: response.roles,
            token: token
          });
          return token;
        }

        return token;
      })
    );
  }

  logout(): Observable<any> {
    return this.authSrv.logout();
  }

  getUser(): Observable<any> {
    const credentials = this.authSrv.credentials;

    log.debug('credentials', credentials);

    return this.http
      .get('/api/account', {
        observe: 'response',
        headers: {
          Authorization: `Bearer ${credentials.token}`
        }
      })
      .pipe(
        map((response: any) => {
          return response;
        })
      );
  }
}
