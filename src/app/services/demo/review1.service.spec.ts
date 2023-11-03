import { TestBed } from '@angular/core/testing';

import { Review1Service } from './review1.service';

describe('Review1Service', () => {
  let service: Review1Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Review1Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
