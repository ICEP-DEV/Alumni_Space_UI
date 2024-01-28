import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobDescriptionComponent } from './job-description.component';

describe('JobDescriptionComponent', () => {
  let component: JobDescriptionComponent;
  let fixture: ComponentFixture<JobDescriptionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JobDescriptionComponent]
    });
    fixture = TestBed.createComponent(JobDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
