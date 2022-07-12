import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { throwError as observableThrowError, Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FavoritosService extends HttpService {

  public getFavoritos(): Observable<any> {
    return this.getRequest('/v1/user/menu/favoritos').pipe(catchError(this.errorHandler));
  }

  public putFavoritos( data: any ): Observable<any> {
    
    return this.putRequest('/v1/user/menu/favoritos', data, null).pipe(catchError(this.errorHandler));
  }

  public deleteFavoritos( data: any ): Observable<any> {
    return this.deleteRequest('/v1/user/menu/favoritos', null, data ).pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse ) {
    return observableThrowError(error.message || 'Server Error');
  }



}
