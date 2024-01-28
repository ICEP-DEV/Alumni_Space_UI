import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobsStatsComponent } from './jobs-stats.component';

describe('JobsStatsComponent', () => {
  let component: JobsStatsComponent;
  let fixture: ComponentFixture<JobsStatsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JobsStatsComponent]
    });
    fixture = TestBed.createComponent(JobsStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
