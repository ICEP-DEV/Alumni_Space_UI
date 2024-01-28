import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YourThoughtsComponent } from './your-thoughts.component';

describe('YourThoughtsComponent', () => {
  let component: YourThoughtsComponent;
  let fixture: ComponentFixture<YourThoughtsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [YourThoughtsComponent]
    });
    fixture = TestBed.createComponent(YourThoughtsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
