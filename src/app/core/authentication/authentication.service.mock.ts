import { Observable, of } from 'rxjs';

import { Credentials, LoginContext } from './authentication.service';

export class MockAuthenticationService {
  credentials: Credentials | null = {
    username: 'user',
    token: '123',
    permissions: [],
    roles: []
  };

  login(context: LoginContext): Observable<Credentials> {
    return of({
      username: context.username,
      token: '123456',
      permissions: [],
      roles: []
    });
  }

  logout(): Observable<boolean> {
    this.credentials = null;
    return of(true);
  }

  isAuthenticated(): boolean {
    return !!this.credentials;
  }
}
