import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptApplicationComponent } from './accept-application.component';

describe('AcceptApplicationComponent', () => {
  let component: AcceptApplicationComponent;
  let fixture: ComponentFixture<AcceptApplicationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AcceptApplicationComponent]
    });
    fixture = TestBed.createComponent(AcceptApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
