import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from '../config';
import { AuthResponse } from '../app-Interface/auth-response.interface';
import { ErrorService } from './error.service';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthUserService {
g

  constructor(private http: HttpClient, private errorService: ErrorService) { }

  signUp(email,password){
  return this.http.post<AuthResponse>(
    `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${Config.API_KEY}`,{
      email: email,
       password: password, 
       returnSecureToken:true
      }) .pipe(
        catchError(err => {
          return  this.errorService.handleError(err)
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
          })
      )
    }
}
