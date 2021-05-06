import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from '../config';
import { AuthResponse } from '../app-Interface/auth-response.interface';
import { ErrorService } from './error.service';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, exhaustMap, take, tap } from 'rxjs/operators';
import { User } from '../app-models/user.model';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthUserService {
  private tokenExpiryTimer: any;
  profileInfo = new BehaviorSubject(
          {
            displayName:'',
            email:'',
            photoUrl:''
          }
  );
  user = new BehaviorSubject<User>(null);
  constructor(private http: HttpClient, private errorService: ErrorService, private router: Router) { 
   // this.autoSignIn();
  }

  signUp(email,password){
  return this.http.post<AuthResponse>(
    `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${Config.API_KEY}`,{
      email: email,
       password: password, 
       returnSecureToken:true
      }) .pipe(
        catchError(err => {
          return  this.errorService.handleError(err)
        }),
        tap(res=>{
          this.authothicateUser(res.email,res.localId,res.idToken,+res.expiresIn);
        })
    )
    }

    signIn(email,password){
      return this.http.post<AuthResponse>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${Config.API_KEY}`,{
       email: email,
       password: password, 
       returnSecureToken:true
        }).pipe(
          catchError(err => {
            return  this.errorService.handleError(err)
          }),
          tap(res=>{
            this.authothicateUser(res.email,res.localId,res.idToken,+res.expiresIn);
           
          })
      )
    }
    
    getUserData(token){
      //alert('getUserData method');
      this.http.post<any>(
        `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${Config.API_KEY}`,{
       idToken: token
        }).subscribe(res=>{
         
          this.profileInfo.next({
            displayName:res.users[0].displayName,
            email:res.users[0].email,
            photoUrl:res.users[0].photoUrl
          })

        })
    }



    updateUserProfile(token,displayName,photoUrl){
      //alert("updateUserProfile");
      return this.http.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${Config.API_KEY}`,{
          idToken: token,
          displayName: displayName,
          photoUrl: photoUrl,
          returnSecureToken:true
        }).pipe(
          catchError(err => {
            return  this.errorService.handleError(err)
          }),
          tap(res=>{
           // console.log('updateUserProfile',res)
           // this.authothicateUser(res.email,res.localId,res.idToken,+res.expiresIn);
           
          })
      )
    }


    private authothicateUser(email, userId,token,expiryIn){
      //let expiryTime =5000;
      const expryDate= new Date(new Date().getTime() + expiryIn*1000);
    const user = new User(email,userId,token,expryDate);
    console.log('user data', user);
    this.user.next(user);
   // alert(expiryIn);
   this.autoSignOut(expiryIn*1000);
    localStorage.setItem('LogInUserData', JSON.stringify(user));
    this.getUserData(token);
    }

  autoSignIn(){
   const userData =JSON.parse(localStorage.getItem('LogInUserData')) ;
   console.log('userData',userData);
    if(!userData){
      return;
    }
    const loggedInUser = new User(userData.email, userData.id,userData.token,new Date(userData.tokenExpiryDate));
    
    console.log('loggedInUser', loggedInUser);
   // if(loggedInUser.userToken){
    //  this.user.next(loggedInUser);
    //}
    this.user.next(loggedInUser);
    const expiryDuration= new Date(userData.tokenExpiryDate).getTime() - new Date().getTime();
    this.autoSignOut(expiryDuration);
  }
   
    signOut(){
      this.user.next(null);
      localStorage.removeItem('LogInUserData');
      if(this.tokenExpiryTimer){
        clearTimeout(this.tokenExpiryTimer);
      }
      this.tokenExpiryTimer = null;
    }

    autoSignOut(expiryDuration: number){
     this.tokenExpiryTimer=  setTimeout(()=>{
        this.signOut();
      },expiryDuration);
      this.router.navigate(["/login"]);
    }

}
