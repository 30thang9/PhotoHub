import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderAcceptAdminComponent } from './order-accept-admin.component';

describe('OrderAcceptAdminComponent', () => {
  let component: OrderAcceptAdminComponent;
  let fixture: ComponentFixture<OrderAcceptAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrderAcceptAdminComponent]
    });
    fixture = TestBed.createComponent(OrderAcceptAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
