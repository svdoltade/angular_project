import { Component, OnInit } from '@angular/core';
import { AuthUserService } from '../service-utility/auth-user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
 isLoggedIn = false;
 UserInfo;
  constructor(private authService: AuthUserService) { }

  ngOnInit(): void {
    this.authService.profileInfo.subscribe(res=>{
      this.isLoggedIn =!res ? false : true;
     this.UserInfo= res;
    })
  }

  onSignOut(){
    this.authService.signOut();
    this.isLoggedIn=false
  }

}
