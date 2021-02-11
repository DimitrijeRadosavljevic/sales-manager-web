import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {EmployeeService} from '../employee.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-employee-delete-dialog',
  templateUrl: './employee-delete-dialog.component.html',
  styleUrls: ['./employee-delete-dialog.component.scss']
})
export class EmployeeDeleteDialogComponent implements OnInit {
  @Input() employeeId: string;
  @Output() onDelete: EventEmitter<string> = new EventEmitter<string>();

  constructor(private employeeService: EmployeeService,
              private toastrService: ToastrService) { }

  ngOnInit(): void {
  }

  public deleteEmployee(): void {
    this.employeeService.deleteEmployee(this.employeeId).subscribe(
      result => {
        this.onDelete.emit(this.employeeId);
        this.toastrService.success('Employee successfully deleted');
      },
      error => {
        this.toastrService.error('Error occurred. Try again later');
      }
    )
  }
}
