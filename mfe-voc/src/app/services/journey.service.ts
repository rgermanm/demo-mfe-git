import { Injectable } from '@angular/core';
import { HttpService } from '../common/services/http.service';
import { Observable } from 'rxjs';
import { JourneyModel } from '../model/journey.model';

@Injectable({
	providedIn: 'root'
})
export class JourneyService extends HttpService {

	private  baseUrl : string = "/api/voc/journey";

	public getJouneysList() : Observable<JourneyModel[]> {
		return this.get( this.baseUrl );
	}

	public updateJouney( journey : JourneyModel) : Observable<any>{
		return this.put(  this.baseUrl , journey);
	}
}
