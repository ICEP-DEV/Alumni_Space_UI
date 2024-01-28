import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastFewNotificationsComponent } from './last-few-notifications.component';

describe('LastFewNotificationsComponent', () => {
  let component: LastFewNotificationsComponent;
  let fixture: ComponentFixture<LastFewNotificationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LastFewNotificationsComponent]
    });
    fixture = TestBed.createComponent(LastFewNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
