import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthResponse } from '../app-Interface/auth-response.interface';
import { AuthUserService } from '../service-utility/auth-user.service';
import { ErrorService } from '../service-utility/error.service';

@Component({
  selector: 'app-auth-user',
  templateUrl: './auth-user.component.html',
  styleUrls: ['./auth-user.component.css']
})
export class AuthUserComponent implements OnInit {
  loginMode:boolean =true;
  authForm: FormGroup;
  errorMsg;
  errorCodes= this.errorService.errorCodes;
  //userType:['Student','Teacher','Other'];

  constructor(private authService: AuthUserService, private errorService:ErrorService) { }

  ngOnInit(): void {
    this.authForm = new FormGroup({
        'username': new FormControl(null,[Validators.required, Validators.email]),
        'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
    })
  }
  
  onSubmit(){
    this.errorMsg='';
    if(this.authForm.valid){
   // alert('form submitted');
    console.log(this.authForm.value);
    let authObservable: Observable<AuthResponse>;
    const email= this.authForm.value.username;
    const password= this.authForm.value.password;
   
    if(this.loginMode){
      authObservable= this.authService.signIn(email, password)
    }else{
      authObservable =this.authService.signUp(email, password)
    }
    authObservable.subscribe(
      successResp=>{
        console.log(successResp);
        alert("login Successfully")
      },
      errorResp=>{
       
       
        this.errorMsg=errorResp;
        console.log(errorResp);

      }
    )
    
    }else{
      this.errorMsg=this.errorMsg= this.errorCodes['INVALID'];
     // alert('form not submitted');
      //...
    }
   }

  onModeSwitch(){
    this.errorMsg='';
    this.loginMode = ! this.loginMode;
  }
}
