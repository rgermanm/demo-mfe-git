import { Component, OnInit } from '@angular/core';
import { authConfig } from './../../config/auth-config';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor( private _http: HttpClient) { }

  ngOnInit() {
    this.onLoggedout();
  }

  //FIXTHIS

  // Metodo para el boton logout
  private onLoggedout(): void {
    localStorage.clear();
    sessionStorage.clear();
    
    this._http.post('/public/logout', {}).subscribe((data: any) => {
      window.location.href = authConfig.oauth2BaseUrl + '/logout?redirect_uri='+ window.location.origin+ '/';
    })

  }
}
