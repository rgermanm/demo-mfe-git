import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { throwError as observableThrowError, Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class Menu1Service extends HttpService {
  public getMenu(): Observable<any> {
    return this.getRequest('/v1/user/menu?codUbicacion=principal').pipe(catchError(this.errorHandler))
    ;
  }

  errorHandler(error: HttpErrorResponse ) {
    return observableThrowError(error.message || 'Server Error');
  }

}
