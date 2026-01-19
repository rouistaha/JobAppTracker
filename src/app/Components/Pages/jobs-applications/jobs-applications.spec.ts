import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobsApplications } from './jobs-applications';

describe('JobsApplications', () => {
  let component: JobsApplications;
  let fixture: ComponentFixture<JobsApplications>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JobsApplications]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobsApplications);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
