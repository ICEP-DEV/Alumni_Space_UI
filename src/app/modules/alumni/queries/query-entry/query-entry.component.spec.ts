import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryEntryComponent } from './query-entry.component';

describe('QueryEntryComponent', () => {
  let component: QueryEntryComponent;
  let fixture: ComponentFixture<QueryEntryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QueryEntryComponent]
    });
    fixture = TestBed.createComponent(QueryEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
