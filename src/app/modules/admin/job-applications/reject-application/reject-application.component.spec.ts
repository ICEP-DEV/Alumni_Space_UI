import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectApplicationComponent } from './reject-application.component';

describe('RejectApplicationComponent', () => {
  let component: RejectApplicationComponent;
  let fixture: ComponentFixture<RejectApplicationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RejectApplicationComponent]
    });
    fixture = TestBed.createComponent(RejectApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
