import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderListAdminComponent } from './order-list-admin.component';

describe('OrderListAdminComponent', () => {
  let component: OrderListAdminComponent;
  let fixture: ComponentFixture<OrderListAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrderListAdminComponent]
    });
    fixture = TestBed.createComponent(OrderListAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
