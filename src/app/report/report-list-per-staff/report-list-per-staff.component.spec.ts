import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportListPerStaffComponent } from './report-list-per-staff.component';

describe('ReportListPerStaffComponent', () => {
  let component: ReportListPerStaffComponent;
  let fixture: ComponentFixture<ReportListPerStaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportListPerStaffComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportListPerStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
