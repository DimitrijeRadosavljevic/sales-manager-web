import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {EmployeeService} from '../employee.service';
import {Employee} from '../../_shared/models/employee';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  loading: number = 0;

  paginationConfig = {
    itemsPerPage: 10,
    currentPage: 1,
    totalItems: null
  };

  constructor(private employeeService: EmployeeService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.initializeComponent();
  }

  private initializeComponent(): void {
    this.fetchEmployees();
  }

  fetchEmployees() {
    this.loading++;
    this.employeeService.getEmployees(this.paginationConfig.currentPage, this.paginationConfig.itemsPerPage).subscribe(
      result => {
        this.paginationConfig.totalItems = result.data.total;
        this.employees = result.data;
      },
      error => {
      },
      () => this.loading--
    );
  }

  onPageChange(event) {
    this.paginationConfig.currentPage = event;
    this.fetchEmployees();
  }
}
