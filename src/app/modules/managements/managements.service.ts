import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthenticationService, HttpService } from '@app/core';

@Injectable({
  providedIn: 'root'
})
export class ManagementsService {
  constructor(private authSrv: AuthenticationService, private http: HttpService) {}
}
