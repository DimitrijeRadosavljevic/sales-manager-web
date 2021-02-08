import { Component, OnInit } from '@angular/core';
import {authError} from '../../store/auth/auth.selectors';
import {select, Store} from '@ngrx/store';
import {FormBuilder, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {State} from '../../store';
import {register} from '../../store/auth/auth.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public formActive: boolean = true;
  public form: FormGroup;
  public errorText: string;
  public error: boolean = false;
  public passwordNotMatch: boolean = false;

  constructor(private formBuilder: FormBuilder, private store: Store<State>) { }

  ngOnInit(): void {
    this.initializeComponent();
  }

  private initializeComponent(): void {
    this.buildForm();
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      name: ['', [Validators.required]],
      password: [null, [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordsMatch });

    this.formActive = true;
  }

  passwordsMatch(registerForm: FormGroup): ValidationErrors | null {
    const password = registerForm.controls.password.value;
    const confirmation = registerForm.controls.confirmPassword.value;

    return (password === confirmation ? null : {passwordsNotMatched: true});
  }

  onSubmit(): void {
    if (!this.form.valid){
      this.form.markAllAsTouched();
      return;
    }

    this.store.dispatch(register ({data: this.form.value }));
    this.store.pipe(select(authError)).subscribe(
      data => {
        if(data) {
          if(data.error) {
            this.errorText = data.error;
            this.error = true;
          }
        } else {
          this.error = false;
        }
      });
  }
}
