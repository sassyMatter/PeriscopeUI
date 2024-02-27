import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoProjectDialogComponent } from './no-project-dialog.component';

describe('NoProjectDialogComponent', () => {
  let component: NoProjectDialogComponent;
  let fixture: ComponentFixture<NoProjectDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NoProjectDialogComponent]
    });
    fixture = TestBed.createComponent(NoProjectDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
