import { ReportPerStaff } from './../../_shared/models/report-per-staff';
import { Component, OnInit } from '@angular/core';
import { PaginatePipeArgs } from 'ngx-pagination/dist/paginate.pipe';
import { FormControl, FormGroup } from '@angular/forms';
import { ReportService } from '../report.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-report-list-per-staff',
  templateUrl: './report-list-per-staff.component.html',
  styleUrls: ['./report-list-per-staff.component.scss']
})
export class ReportListPerStaffComponent implements OnInit {
  public reports: ReportPerStaff [];
  public loading: number = 0;
  public paginationConfig: PaginatePipeArgs = {
    id: 'products',
    itemsPerPage: 6,
    currentPage: 1
  };
  public filter: FormControl;
  public filterFormGroup: FormGroup;
  private filterValue: string;
  constructor(private reportService: ReportService) { }

  ngOnInit(): void {
    this.initializeComponent();
  }

  public initializeComponent() {
    this.fetchReports();
    this.buildFilter();
  }

  public onPageChange($event) {
    this.paginationConfig.currentPage = $event;
    this.fetchReports();
  }

  private fetchReports() {
    this.loading++;
    this.reportService.fetchReportsPerStaff(this.paginationConfig.itemsPerPage, this.paginationConfig.currentPage, this.filterValue).subscribe(
      response => {
        this.paginationConfig.totalItems = response.data.total;
        this.reports = response.data.reports as ReportPerStaff[];
      },
      error => { 
        console.log(error);
      },
      () => { this.loading--}
    )
  }

  private buildFilter() {
    this.filterFormGroup = new FormGroup({
      filter: new FormControl()
    })

    this.filterFormGroup.valueChanges
      .pipe(
        debounceTime(200),
        distinctUntilChanged())
      .subscribe(value => {
          this.filterValue = value.filter;
          this.fetchReports();
      });
  }

}
