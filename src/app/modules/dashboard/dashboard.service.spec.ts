import { DashboardService } from './dashboard.service';

describe('DashboardService', () => {
  let httpClientSpy: { get: jasmine.Spy };
  let service: DashboardService;
  let auth: DashboardService;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new DashboardService(<any>httpClientSpy, <any>auth);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
