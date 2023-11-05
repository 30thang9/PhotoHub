import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseRepairComponent } from './warehouse-repair.component';

describe('WarehouseRepairComponent', () => {
  let component: WarehouseRepairComponent;
  let fixture: ComponentFixture<WarehouseRepairComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WarehouseRepairComponent]
    });
    fixture = TestBed.createComponent(WarehouseRepairComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
