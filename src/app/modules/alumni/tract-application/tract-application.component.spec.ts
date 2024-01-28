import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TractApplicationComponent } from './tract-application.component';

describe('TractApplicationComponent', () => {
  let component: TractApplicationComponent;
  let fixture: ComponentFixture<TractApplicationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TractApplicationComponent]
    });
    fixture = TestBed.createComponent(TractApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
