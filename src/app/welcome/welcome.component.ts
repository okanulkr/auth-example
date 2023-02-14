import { Component, Input } from '@angular/core';
import { AuthClient } from '../client/auth';
import { SignInResponse, Status } from '../client/dto';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent {
  constructor(private authClient: AuthClient) { }
  private _token = '';
  @Input()
  set token(value: string) {
    this._token = value;
    this.getGreeting();
  }
  get token(): string {
    return this._token
  }

  greeting: string = ''

  ngOnInit() {
    this.getGreeting()
  }

  private getGreeting() {
    this.authClient.getGreeting(this.token).subscribe(
      (greetingResponse) => {
        if (greetingResponse.status === Status.Ok) {
          this.greeting = greetingResponse.data;
          return;
        }

        console.log(greetingResponse.error);
      }
    );
  }
}
