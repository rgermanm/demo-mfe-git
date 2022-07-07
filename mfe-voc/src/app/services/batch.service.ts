import { Injectable } from '@angular/core';
import { HttpService } from '../common/services/http.service';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class BatchService extends HttpService {

	public getBatchTable(tableParams: any): Observable<any> {
		return this.get('/api/voc/batch', tableParams);
	}

	public toPending(oid: String): Observable<any> {
		return this.post('/api/voc/batch/' + oid + "/pending", {  });
	}

	public toAbort(oid: String): Observable<any> {
		return this.post('/api/voc/batch/' + oid + "/abort", {  });
	}

	public getBatch(oid: String): Observable<any> {
		return this.get('/api/voc/batch/' + oid);
	}

	public deleteBatch(oid: String): Observable<any> {
		return this.delete('/api/voc/batch/' + oid);
	}

	public getBatchDetailTable(oid:string,tableParams: any): Observable<any> {
		return this.get('/api/voc/batch/'+oid+'/details', tableParams);
	}

	public getBatchDetail(oid: String,dOid: String): Observable<any> {
		return this.get('/api/voc/batch/' + oid + '/details/'+dOid);
	}

}
