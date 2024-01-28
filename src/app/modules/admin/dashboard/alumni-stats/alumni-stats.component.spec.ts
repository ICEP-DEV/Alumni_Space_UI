import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumniStatsComponent } from './alumni-stats.component';

describe('AlumniStatsComponent', () => {
  let component: AlumniStatsComponent;
  let fixture: ComponentFixture<AlumniStatsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlumniStatsComponent]
    });
    fixture = TestBed.createComponent(AlumniStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
