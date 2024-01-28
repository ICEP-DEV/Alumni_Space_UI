import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumniResumeComponent } from './alumni-resume.component';

describe('AlumniResumeComponent', () => {
  let component: AlumniResumeComponent;
  let fixture: ComponentFixture<AlumniResumeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlumniResumeComponent]
    });
    fixture = TestBed.createComponent(AlumniResumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
