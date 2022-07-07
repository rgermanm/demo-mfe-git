import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../common/services/http.service';
import { map } from 'rxjs/operators';
import { auth } from '../common/model/auth';

@Injectable({
  providedIn: 'root'
})
export class AppService extends HttpService {

	public conf(): Observable<any> {
        return this.getNoCache( '/public/conf' ).pipe( map( data => {
            auth.hasSession = data.hasSession;
            auth.oauth2.baseUrl = data.oauth2BaseUrl;
			auth.oauth2.clientId = 'AllianzVOC';
			auth.oauth2.redirectUri = data.redirectUri;
            return data;
        } ) );
    }

	public postLogin(code:String, uri:String): Observable<any> {
        return this.post( '/public/postLogin', {code:code,redirect_uri:uri,client_id:'AllianzVOC' } );
    }

	public version():Observable<any>{
		return this.get('/api/voc/public/app/version');
	}
	
	public user(): Observable<any> {
        return this.getNoCache( '/api/voc/security/user' ).pipe( map( data => {
			auth.user=data.user;
			auth.roles=data.roles;
            return data;
        } ) );
    }

	public menu(): Observable<any> {
        return this.getNoCache( '/api/voc/security/menu' );
    }

	public logout(): Observable<any> {		
        return this.post( '/public/logout',{} );
    }
}
