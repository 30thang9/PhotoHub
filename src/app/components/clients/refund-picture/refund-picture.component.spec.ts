import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefundPictureComponent } from './refund-picture.component';

describe('RefundPictureComponent', () => {
  let component: RefundPictureComponent;
  let fixture: ComponentFixture<RefundPictureComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RefundPictureComponent]
    });
    fixture = TestBed.createComponent(RefundPictureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
