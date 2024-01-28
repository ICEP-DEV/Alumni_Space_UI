import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllAlumnusComponent } from './all-alumnus.component';

describe('AllAlumnusComponent', () => {
  let component: AllAlumnusComponent;
  let fixture: ComponentFixture<AllAlumnusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllAlumnusComponent]
    });
    fixture = TestBed.createComponent(AllAlumnusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
