import { TestBed } from '@angular/core/testing';

import { UserInfoDTO1Service } from './user-info-dto1.service';

describe('UserInfoDTO1Service', () => {
  let service: UserInfoDTO1Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserInfoDTO1Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
