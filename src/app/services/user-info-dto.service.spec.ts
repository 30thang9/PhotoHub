import { TestBed } from '@angular/core/testing';

import { UserInfoDTOService } from './user-info-dto.service';

describe('UserInfoDTOService', () => {
  let service: UserInfoDTOService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserInfoDTOService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
