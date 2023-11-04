import { TestBed } from '@angular/core/testing';

import { OrderDTOService } from './order-dto.service';

describe('OrderDTOService', () => {
  let service: OrderDTOService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderDTOService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
