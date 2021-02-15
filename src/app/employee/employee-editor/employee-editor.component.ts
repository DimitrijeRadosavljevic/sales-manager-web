import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { Employee } from '../../_shared/models/employee';

import { EmployeeService } from '../employee.service';
import {Promotion} from '../../_shared/models/promotion';
import {Address} from '../../_shared/models/address';
import {Contact} from '../../_shared/models/contact';
import {Vacation} from '../../_shared/models/vacation';

@Component({
  selector: 'app-employee-editor',
  templateUrl: './employee-editor.component.html',
  styleUrls: ['./employee-editor.component.scss']
})
export class EmployeeEditorComponent implements OnInit {
  public employeeId: string | null;
  public form: FormGroup;
  public formActive: boolean = false;
  public loading: number = 0;

  get promotionsForms(): FormArray { return this.form.get('promotions') as FormArray; }
  get addressesForms(): FormArray { return this.form.get('addresses') as FormArray; }
  get contactsForms(): FormArray { return this.form.get('contacts') as FormArray; }
  get vacationsForms(): FormArray { return this.form.get('vacations') as FormArray; }

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private toastrService: ToastrService,
              private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.initializeComponent();
  }

  private initializeComponent(): void {
    this.route.paramMap.subscribe(params => {
      if (params.has('employeeId')) {
        this.employeeId = params.get('employeeId');
        this.fetchEmployee();
      }
      else {
        this.buildForm();
      }
    });
  }

  private buildForm(employee?: Employee): void {
    this.form = this.formBuilder.group({
      _id: [employee ? employee._id : null],
      firstName: [employee ? employee.firstName : null, [Validators.required]],
      middleName: [employee ? employee.middleName : null],
      lastName: [employee ? employee.lastName : null, [Validators.required]],
      email: [employee ? employee.email : null, [Validators.required, Validators.email]],
      employeeNumber: [employee ? employee.employeeNumber : null, [Validators.required]],
      role: [employee ? employee.role : 'junior', [Validators.required]],
      startedWorking: [employee ? new Date(employee.startedWorking).toISOString().substr(0, 10) : new Date().toISOString().substr(0, 10), [Validators.required]],

      promotions: this.buildPromotionsForms(employee ? employee.promotions : []),
      vacations: this.buildVacationsForms(employee ? employee.vacations : []),
      contacts: this.buildContactsForms(employee ? employee.contacts : []),
      addresses: this.buildAddressesForms(employee ? employee.addresses : [])
    });

    if (employee == null) {
      this.form.addControl('password', new FormControl('', Validators.required));
      this.form.addControl('confirmPassword', new FormControl('', Validators.required));
      this.form.setValidators(this.passwordsMatch);
    }

    this.formActive = true;
  }

  private passwordsMatch(registerForm: FormGroup): ValidationErrors | null {
    const password = registerForm.controls.password.value;
    const confirmation = registerForm.controls.confirmPassword.value;

    return (password === confirmation ? null : {passwordsNotMatched: true});
  }

  private buildPromotionsForms(promotions: Promotion[]): FormArray {
    const promotionsFormGroups: FormGroup[] = promotions.map(promotion => {
      return this.buildPromotionForm(promotion);
    });

    return this.formBuilder.array(promotionsFormGroups);
  }

  private buildPromotionForm(promotion?: Promotion): FormGroup {
    return this.formBuilder.group({
      date: [promotion ? new Date(promotion.date).toISOString().substr(0, 10) : new Date().toISOString().substr(0, 10), Validators.required],
      newRole: [promotion ? promotion.newRole : 'junior', Validators.required],
      note: [promotion ? promotion.note : '']
    });
  }

  private buildVacationsForms(vacations: Vacation[]): FormArray {
    const vacationsFormGroups: FormGroup[] = vacations.map(vacation => {
      return this.buildVacationForm(vacation);
    });

    return this.formBuilder.array(vacationsFormGroups);
  }

  private buildVacationForm(vacation?: Vacation): FormGroup {
    return this.formBuilder.group({
      from: [vacation ? new Date(vacation.from).toISOString().substr(0, 10) : new Date().toISOString().substr(0, 10), Validators.required],
      to: [vacation ? new Date(vacation.to).toISOString().substr(0, 10) : new Date().toISOString().substr(0, 10), Validators.required],
      note: [vacation ? vacation.note : ''],
    });
  }

  private buildAddressesForms(addresses: Address[]): FormArray {
    const addressesFormGroups: FormGroup[] = addresses.map(address => {
      return this.buildAddressForm(address);
    });

    return this.formBuilder.array(addressesFormGroups);
  }

  private buildAddressForm(address?: Address): FormGroup {
    return this.formBuilder.group({
      street: [address ? address.street : ''],
      city: [address ? address.city : ''],
      country: [address ? address.country : ''],
      postalCode: [address ? address.postalCode : '']
    }, { validators: this.atLeastOneAddressFieldIsRequired });
  }

  private buildContactsForms(contacts: Contact[]): FormArray {
    const contactsFormGroups: FormGroup[] = contacts.map(contact => {
      return this.buildContactForm(contact);
    });

    return this.formBuilder.array(contactsFormGroups);
  }

  private buildContactForm(contact?: Contact): FormGroup {
    return this.formBuilder.group({
      type: [contact ? contact.type : 'number', Validators.required],
      value: [contact ? contact.value : '', Validators.required],
    });
  }

  private atLeastOneAddressFieldIsRequired(form: FormGroup): ValidationErrors | null {
    return form.controls.street.value !== '' ||
            form.controls.city.value !== '' ||
            form.controls.country.value !== '' ||
            form.controls.postalCode.value !== '' ? null : { addressRequired: true };
  }

  public onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const employee: Employee = this.form.value as Employee;

    if (this.employeeId) {
      this.loading++;
      this.employeeService.putEmployee(employee).subscribe(
        result => {
          this.toastrService.success('Employee successfully updated!');
          this.router.navigate([`/employees`]);
        },
        error => {
          this.toastrService.error('Account with this email already exists!');
        },
        () => this.loading--
      );
    }
    else {
      this.loading++;
      this.employeeService.postEmployee(employee).subscribe(
        result => {
          this.toastrService.success('Employee successfully created!');
          this.router.navigate([`/employees`]);
        },
        error => {
          this.toastrService.error('Account with this email already exists');
        },
        () => this.loading--
      );
    }
  }

  private fetchEmployee(): void {
    this.loading++;
    this.employeeService.getEmployee(this.employeeId).subscribe(
      result => {
        this.buildForm(result.data);
      },
      error => {
          this.toastrService.error('Error has occurred, try again later');
      },
      () => this.loading--
    );
  }

  public addPromotion(): void {
    const newPromotionForm = this.buildPromotionForm();
    this.promotionsForms.push(newPromotionForm);
  }

  public removePromotion(index: number): void {
    this.promotionsForms.controls = this.promotionsForms.controls.filter((form, i) => i !== index);
  }

  public addAddress(): void {
    const newAddressForm = this.buildAddressForm();
    this.addressesForms.push(newAddressForm);
  }

  public removeAddress(index: number): void {
    this.addressesForms.controls = this.addressesForms.controls.filter((form, i) => i !== index);
  }

  public addContact(): void {
    const newContactForm = this.buildContactForm();
    this.contactsForms.push(newContactForm);
  }

  public removeContact(index: number): void {
    this.contactsForms.controls = this.contactsForms.controls.filter((form, i) => i !== index);
  }

  public addVacation(): void {
    const newVacationForm = this.buildVacationForm();
    this.vacationsForms.push(newVacationForm);
  }

  public removeVacation(index: number): void {
    this.vacationsForms.controls = this.vacationsForms.controls.filter((form, i) => i !== index);
  }
}
