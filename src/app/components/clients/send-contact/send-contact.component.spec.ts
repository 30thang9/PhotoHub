import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendContactComponent } from './send-contact.component';

describe('SendContactComponent', () => {
  let component: SendContactComponent;
  let fixture: ComponentFixture<SendContactComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SendContactComponent]
    });
    fixture = TestBed.createComponent(SendContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
