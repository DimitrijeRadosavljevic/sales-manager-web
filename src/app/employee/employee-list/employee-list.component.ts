import { Component, OnInit, EventEmitter } from '@angular/core';
import {Router} from '@angular/router';
import {EmployeeService} from '../employee.service';
import {Employee} from '../../_shared/models/employee';
import {ToastrService} from 'ngx-toastr';
import {EmployeeDeleteDialogComponent} from '../employee-delete-dialog/employee-delete-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {FormControl} from '@angular/forms';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';


@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  loading: number = 0;
  employeeToDelete: string;
  filter: FormControl;

  paginationConfig = {
    id: 'employees',
    itemsPerPage: 10,
    currentPage: 1,
    totalItems: null
  };

  constructor(private employeeService: EmployeeService,
              private router: Router,
              private toastrService: ToastrService,
              public matDialog: MatDialog) {
  }

  ngOnInit(): void {
    this.initializeComponent();
  }

  private initializeComponent(): void {
    this.buildFilter();
    this.fetchEmployees();
  }

  private buildFilter(): void {
    this.filter = new FormControl('');
    this.filter.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged())
      .subscribe(value => {
        this.fetchEmployees();
      });
  }

  private fetchEmployees(): void {
    this.loading++;
    this.employeeService.getEmployees(this.paginationConfig.currentPage, this.paginationConfig.itemsPerPage, this.filter.value).subscribe(
      result => {
        this.paginationConfig.totalItems = result.data.total;
        this.employees = result.data.docs;
      },
      error => {
      },
      () => this.loading--
    );
  }

  public onPageChange(event): void {
    this.paginationConfig.currentPage = event;
    this.fetchEmployees();
  }

  public openDeleteEmployeeDialog(_id: string): void {
    const onDeleteEvent = new EventEmitter<string>();
    onDeleteEvent.subscribe(value => {
      this.employees = this.employees.filter(employee => employee._id !== value);
    });

    const dialogRef = this.matDialog.open(EmployeeDeleteDialogComponent);
    dialogRef.componentInstance.employeeId = _id;
    dialogRef.componentInstance.onDelete = onDeleteEvent;
  }
}
