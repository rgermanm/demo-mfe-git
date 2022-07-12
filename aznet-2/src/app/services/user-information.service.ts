import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { throwError as observableThrowError, Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserInformationService extends HttpService {

  public getUserInformation(): Observable<any> {
    return this.getRequest('/v1/user/information').pipe(catchError(this.errorHandler))
    ;
  }

  public putUserInformation( data: any ): Observable<any> {
    return this.putRequest('/v1/user/information', data, null).pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse ) {
    return observableThrowError(error.message || 'Server Error');
  }



}
