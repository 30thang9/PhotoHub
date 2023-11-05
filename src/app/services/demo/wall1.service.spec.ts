import { TestBed } from '@angular/core/testing';

import { Wall1Service } from './wall1.service';

describe('Wall1Service', () => {
  let service: Wall1Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Wall1Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
