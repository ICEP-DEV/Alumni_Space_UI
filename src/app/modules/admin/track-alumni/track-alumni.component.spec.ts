import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackAlumniComponent } from './track-alumni.component';

describe('TrackAlumniComponent', () => {
  let component: TrackAlumniComponent;
  let fixture: ComponentFixture<TrackAlumniComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrackAlumniComponent]
    });
    fixture = TestBed.createComponent(TrackAlumniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
