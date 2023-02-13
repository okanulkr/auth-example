import { Component } from '@angular/core';
import { MessageType } from './client/dto';
import { AuthClient } from './client/auth';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private authClient: AuthClient) { }
  loggedIn: boolean = false
  token: string = ''

  public onLogin(token: string) {
    this.loggedIn = true;
    this.token = token;
    this.listenLoginState(token);
  }

  private listenLoginState(token: string) {
    this.authClient.startLoginStream(token).subscribe(
      (socketMessage) => {
        if (socketMessage.messageType == MessageType.LogOff) {
          this.loggedIn = false;
        }

        console.log(socketMessage);
      }
    );
  }
}

