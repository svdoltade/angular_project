import { Component, OnInit } from '@angular/core';
import { AuthUserService } from './service-utility/auth-user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  storeTitle = 'Electronic shop Store';
  constructor(private authService:AuthUserService){

  }
  ngOnInit(): void {
    this.authService.autoSignIn();
    //throw new Error('Method not implemented.');
  }
}
