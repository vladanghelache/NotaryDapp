import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'NotaryDapp';
  constructor(private router:Router) {
  }

  goToSignDocument(){
    this.router.navigateByUrl('/sign_document');
  }

  goToVerifyDocument(){
    this.router.navigateByUrl("/verify_document");
  }
}
