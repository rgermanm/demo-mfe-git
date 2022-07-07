import { Injectable } from '@angular/core';
import { HttpService } from '../common/services/http.service';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class PropertiesService extends HttpService {

	public getPropertiesTable(tableParams:any): Observable<any> {
		return this.get('/api/voc/properties', tableParams);
	}

	public getProperty(oid:String): Observable<any> {
		return this.get('/api/voc/properties/' + oid);
	}

	public saveProperty(prop:any): Observable<any> {
		return this.put('/api/voc/properties/' + prop.oid, prop);
	}
}
