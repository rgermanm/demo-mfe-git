import { Injectable } from '@angular/core';
import { CanActivate,Router } from '@angular/router';
import { auth } from './model/auth'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
	
	constructor( private router: Router) { }
	
    canActivate() {        
        if (auth.hasSession){
            return true;
        }
        this.router.navigate(['/']);
        return false;
    }
  
}
