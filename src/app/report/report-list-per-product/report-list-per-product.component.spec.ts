import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportListPerProductComponent } from './report-list-per-product.component';

describe('ReportListPerProductComponent', () => {
  let component: ReportListPerProductComponent;
  let fixture: ComponentFixture<ReportListPerProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportListPerProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportListPerProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
