import { TestBed } from '@angular/core/testing';

import { UserInfo1Service } from './user-info1.service';

describe('UserInfo1Service', () => {
  let service: UserInfo1Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserInfo1Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
