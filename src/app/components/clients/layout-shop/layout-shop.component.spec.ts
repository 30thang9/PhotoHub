import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutShopComponent } from './layout-shop.component';

describe('LayoutShopComponent', () => {
  let component: LayoutShopComponent;
  let fixture: ComponentFixture<LayoutShopComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LayoutShopComponent]
    });
    fixture = TestBed.createComponent(LayoutShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
