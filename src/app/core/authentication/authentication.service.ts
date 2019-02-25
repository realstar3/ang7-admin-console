import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '@env/environment';

export interface Credentials {
  username: string;
  token: string;
  permissions: string[];
  roles: string[];
}

export interface LoginContext {
  username: string;
  password: string;
  token: string;
  permissions: string[];
  roles: string[];
  rememberMe?: boolean;
}

/**
 * Provides a base for authentication workflow.
 * The Credentials interface as well as login/logout methods should be replaced with proper implementation.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private _credentials: Credentials | null;

  constructor() {
    const savedCredentials =
      sessionStorage.getItem(environment.credentialsKey) || localStorage.getItem(environment.credentialsKey);

    if (savedCredentials) {
      this._credentials = JSON.parse(savedCredentials);
    }
  }

  /**
   * Authenticates the user.
   * @param context The login parameters.
   * @return The user credentials.
   */
  login(context: LoginContext): Observable<Credentials> {
    const data = {
      username: context.username,
      token: context.token,
      permissions: context.permissions,
      roles: context.roles
    };
    this.setCredentials(data, context.rememberMe);
    return of(data);
  }

  /**
   * Logs out the user and clear credentials.
   * @return True if the user was logged out successfully.
   */
  logout(): Observable<boolean> {
    // Customize credentials invalidation here
    this.setCredentials();
    return of(true);
  }

  /**
   * Checks is the user is authenticated.
   * @return True if the user is authenticated.
   */
  isAuthenticated(): boolean {
    return !!this.credentials;
  }

  /**
   * Gets the user credentials.
   * @return The user credentials or null if the user is not authenticated.
   */
  get credentials(): Credentials | null {
    return this._credentials;
  }

  /**
   * Sets the user credentials.
   * The credentials may be persisted across sessions by setting the `remember` parameter to true.
   * Otherwise, the credentials are only persisted for the current session.
   * @param credentials The user credentials.
   * @param rememberMe True to remember credentials across sessions.
   */
  private setCredentials(credentials?: Credentials, rememberMe?: boolean) {
    this._credentials = credentials || null;

    if (credentials) {
      const storage = rememberMe ? localStorage : sessionStorage;
      storage.setItem(environment.credentialsKey, JSON.stringify(credentials));
    } else {
      sessionStorage.removeItem(environment.credentialsKey);
      localStorage.removeItem(environment.credentialsKey);
    }
  }
}
