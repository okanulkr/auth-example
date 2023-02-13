import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { AuthClient } from '../client/auth';
import { Status } from '../client/dto';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private authClient: AuthClient) { }
  public matcher = new MyErrorStateMatcher();

  public emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  public passwordFormControl = new FormControl('', [Validators.required]);

  @Output()
  onLogin: EventEmitter<string> = new EventEmitter<string>()


  public login() {
    this.authClient.signIn(this.emailFormControl.value!, this.passwordFormControl.value!).subscribe(
      (signInResponse) => {
        if (signInResponse.status === Status.Ok) {
          this.onLogin.emit(signInResponse.data.token);
          return;
        }

        console.log(signInResponse.error);
      }
    );
  }
}
