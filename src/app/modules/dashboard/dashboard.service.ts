import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthenticationService, HttpService } from '@app/core';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  constructor(private authSrv: AuthenticationService, private http: HttpService) {}

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
}
