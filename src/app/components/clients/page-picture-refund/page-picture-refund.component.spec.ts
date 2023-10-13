import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagePictureRefundComponent } from './page-picture-refund.component';

describe('PagePictureRefundComponent', () => {
  let component: PagePictureRefundComponent;
  let fixture: ComponentFixture<PagePictureRefundComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PagePictureRefundComponent]
    });
    fixture = TestBed.createComponent(PagePictureRefundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
