import { TestBed } from '@angular/core/testing';

import { AuthenticityService } from './authenticity.service';

describe('AuthenticityService', () => {
  let service: AuthenticityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthenticityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
