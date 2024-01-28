import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessPasswordChangeComponent } from './success-password-change.component';

describe('SuccessPasswordChangeComponent', () => {
  let component: SuccessPasswordChangeComponent;
  let fixture: ComponentFixture<SuccessPasswordChangeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuccessPasswordChangeComponent]
    });
    fixture = TestBed.createComponent(SuccessPasswordChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
