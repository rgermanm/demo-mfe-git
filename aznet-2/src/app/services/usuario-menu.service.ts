import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { throwError as observableThrowError, Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioMenuService extends HttpService {
  public getUsuario(): Observable<any> {
    return this.getRequest('/v1/user/menu?codUbicacion=usuario').pipe(catchError(this.errorHandler))
    ;
  }

  public elasticSearch(text:string, grupo:string = null , organizador:string = null , productor:string = null, size:number = 10, page:number = 1): Observable<any> {
    let grp = ''
    let org = ''
    let prd = ''
    if(grupo) grp = '&grp=' + grupo
    if(organizador) org = '&org=' + organizador
    if(productor) prd = '&prd=' + productor
    return this.getRequest('/v1/search?text='+ text + grp + org + prd + '&size='+ size + '&page=' + page).pipe(catchError(this.errorHandler))
    ;
  }

  errorHandler(error: HttpErrorResponse ) {
    return observableThrowError(error.message || 'Server Error');
  }



}
