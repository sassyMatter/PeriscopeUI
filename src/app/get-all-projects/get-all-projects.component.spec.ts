import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAllProjectsComponent } from './get-all-projects.component';

describe('GetAllProjectsComponent', () => {
  let component: GetAllProjectsComponent;
  let fixture: ComponentFixture<GetAllProjectsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GetAllProjectsComponent]
    });
    fixture = TestBed.createComponent(GetAllProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});



