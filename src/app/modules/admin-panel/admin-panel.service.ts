import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpService, AuthenticationService, Logger } from '@app/core';

const log = new Logger('AdminPanelService');

@Injectable({ providedIn: 'root' })
export class AdminPanelService {
  constructor(private http: HttpService, private authSrv: AuthenticationService) {}

  getManagementNames(): Observable<any> {
    const credentials = this.authSrv.credentials;

    if (!credentials) {
      return;
    }

    return this.http
      .get('/api/hac/all/management/names', {
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

  getChildManagementNames(managementName: any): Observable<any> {
    const credentials = this.authSrv.credentials;

    if (!credentials) {
      return;
    }

    return this.http
      .get('/api/hac/all/' + managementName + '/entities', {
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

  getEntityFields(entityName: any): Observable<any> {
    const credentials = this.authSrv.credentials;

    if (!credentials) {
      return;
    }
    return this.http
      .get('/api/hac/entity/search/config/' + entityName, {
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
