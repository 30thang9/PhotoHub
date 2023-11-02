import { TestBed } from '@angular/core/testing';

import { OrderDTO1Service } from './order-dto1.service';

describe('OrderDTO1Service', () => {
  let service: OrderDTO1Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderDTO1Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
