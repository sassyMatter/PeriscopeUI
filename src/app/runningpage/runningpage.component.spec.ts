import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RunningpageComponent } from './runningpage.component';

describe('RunningpageComponent', () => {
  let component: RunningpageComponent;
  let fixture: ComponentFixture<RunningpageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RunningpageComponent]
    });
    fixture = TestBed.createComponent(RunningpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
