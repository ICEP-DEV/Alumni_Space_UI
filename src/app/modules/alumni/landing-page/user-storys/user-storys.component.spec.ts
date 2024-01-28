import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserStorysComponent } from './user-storys.component';

describe('UserStorysComponent', () => {
  let component: UserStorysComponent;
  let fixture: ComponentFixture<UserStorysComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserStorysComponent]
    });
    fixture = TestBed.createComponent(UserStorysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
