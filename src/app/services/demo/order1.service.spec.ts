import { TestBed } from '@angular/core/testing';

import { Order1Service } from './order1.service';

describe('Order1Service', () => {
  let service: Order1Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Order1Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
