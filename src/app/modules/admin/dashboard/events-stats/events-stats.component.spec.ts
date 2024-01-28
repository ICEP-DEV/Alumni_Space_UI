import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsStatsComponent } from './events-stats.component';

describe('EventsStatsComponent', () => {
  let component: EventsStatsComponent;
  let fixture: ComponentFixture<EventsStatsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EventsStatsComponent]
    });
    fixture = TestBed.createComponent(EventsStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
