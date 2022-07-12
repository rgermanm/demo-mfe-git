import { Injectable } from '@angular/core';
import { HttpHeaders,HttpClient } from '@angular/common/http';
import { authConfig } from '../config/auth-config';
import { Services } from './services.service';


@Injectable({
  providedIn: 'root'
})
export class CheckSessionService {

  constructor(private _http :HttpClient, private _services : Services ) { 
    
  }

public checkSession(): Promise <any> {

  return new Promise((resolve,reject)=> {

    this._services.getUserInformation()
    .then(() => {
      const httpHeaders = new HttpHeaders({
        'Cache-Control': 'no-cache, no-store, must-revalidate, post-check=0, pre-check=0',
        'Pragma':'no-cache',
        'Expires':'0'
      });
      this._http.get('/public/conf',{headers: httpHeaders}).toPromise().then((data:any) => {
        const { result } = data;
      
          if (!result.hasSession) {
            alert("Su sesión ha expirado por inactividad");
            window.location.href = "/";
          } else {
            resolve("ok");
          }
      });

    }).catch(() => {
        reject();
    });

  })
   
}

}








