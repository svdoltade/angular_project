import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor() { }
  errorCodes = {
    UNKNOWN: 'Service down, Please try again',
    INVALID:'Please Enter Valid email or Password',
    EMAIL_EXISTS: 'The email address is already in use by another account.',
    OPERATION_NOT_ALLOWED: 'Password sign-in is disabled for this project.',
    TOO_MANY_ATTEMPTS_TRY_LATER:'We have blocked all requests from this device due to unusual activity.',
    EMAIL_NOT_FOUND: 'There is no user record corresponding to this identifier. The user may have been deleted.',
    INVALID_PASSWORD: "The password is invalid or the user does not have a password.",
    USER_DISABLED: "The user account has been disabled by an administrator."
  }

  handleError(errorResp: HttpErrorResponse){
    if(!errorResp.error || !errorResp.error.error){
      return throwError(this.errorCodes['UNKNOWN']);
    //  this.errorMsg= this.errorCodes['UNKNOWN'];
    }else{
      return throwError(this.errorCodes[errorResp.error.error.message]);
     // this.errorMsg= this.errorCodes[errorResp.error.error.message];
    }
  }
}
