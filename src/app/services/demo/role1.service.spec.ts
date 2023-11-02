import { TestBed } from '@angular/core/testing';

import { Role1Service } from './role1.service';

describe('Role1Service', () => {
  let service: Role1Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Role1Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
