import { ReportService } from './../report.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PaginatePipeArgs } from 'ngx-pagination/dist/paginate.pipe';
import { ReportPerProduct } from 'src/app/_shared/models/rport-per-product';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-report-list-per-product',
  templateUrl: './report-list-per-product.component.html',
  styleUrls: ['./report-list-per-product.component.scss']
})
export class ReportListPerProductComponent implements OnInit {

  public reports: ReportPerProduct [];
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
    this.reportService.fetchReports(this.paginationConfig.itemsPerPage, this.paginationConfig.currentPage, this.filterValue).subscribe(
      response => {
        this.paginationConfig.totalItems = response.data.total;
        this.reports = response.data.reports as ReportPerProduct[];
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
