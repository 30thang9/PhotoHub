import { TestBed } from '@angular/core/testing';

import { Deces1Service } from './deces1.service';

describe('Deces1Service', () => {
  let service: Deces1Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Deces1Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
