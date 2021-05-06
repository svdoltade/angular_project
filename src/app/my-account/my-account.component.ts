import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthUserService } from '../service-utility/auth-user.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {

  editMode:boolean =false;
  profileForm: FormGroup;
  errorMsg='';
  profileInfo;
   userToken =JSON.parse(localStorage.getItem('LogInUserData')).token ;
 
  constructor(private router: Router, private authService:AuthUserService) {
   }

  ngOnInit(): void {
    this.profileForm = new FormGroup({
      'name': new FormControl(null,[Validators.required]),
      'profilePath': new FormControl(null, [Validators.required])
  })
  this.authService.profileInfo.subscribe(res=>{
    this.profileInfo = res;
    this.profileForm.setValue({
      name: res.displayName,
      profilePath:res.photoUrl
    })
  })
  }

  onSubmit(){
    this.errorMsg='';
    if(this.profileForm.valid){
      const displyName= this.profileForm.value.name;
      const photoUrl= this.profileForm.value.profilePath;
      console.log(displyName,photoUrl,this.userToken),

      this.authService.updateUserProfile(this.userToken,displyName,photoUrl).subscribe(
        successResp=>{
          console.log(successResp);

          this.onEditSwitch();
          this.authService.getUserData(this.userToken);
          this.router.navigate(["/profile"]);
          

         // alert("login Successfully")
        },
        errorResp=>{
          this.errorMsg=errorResp;
          console.log(errorResp);
  
        }
      )
    }else{

    }
  }

  onEditSwitch(){
    this.errorMsg='';
    this.editMode = ! this.editMode;
  }
  onCancel(){
    this.onEditSwitch();
   this.router.navigate([],{queryParams:{EditMode:null}});
    
  }
  onEdit(){
    this.onEditSwitch();
  }
 
  updateUserInfo(){
    const name= this.profileForm.value.name;
    const photoUrl= this.profileForm.value.profilePath;
    this.authService.updateUserProfile(this.userToken,name,photoUrl);
  }
 
}
