import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutProfileComponent } from './layout-profile.component';

describe('LayoutProfileComponent', () => {
  let component: LayoutProfileComponent;
  let fixture: ComponentFixture<LayoutProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LayoutProfileComponent]
    });
    fixture = TestBed.createComponent(LayoutProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
