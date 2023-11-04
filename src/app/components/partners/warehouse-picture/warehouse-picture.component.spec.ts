import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehousePictureComponent } from './warehouse-picture.component';

describe('WarehousePictureComponent', () => {
  let component: WarehousePictureComponent;
  let fixture: ComponentFixture<WarehousePictureComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WarehousePictureComponent]
    });
    fixture = TestBed.createComponent(WarehousePictureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
