import { Injectable } from '@angular/core';
import { HttpService } from '../common/services/http.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobsService extends HttpService {

   public getJobTable( tableParams:any ): Observable<any> {
        return this.get( '/api/voc/scheduler/job', tableParams );
    }

    public deleteJob( oid:String ): Observable<any> {
        return this.delete( '/api/voc/scheduler/job/' + oid );
    }

    public enableJob( oid:String ): Observable<any> {
        return this.put( '/api/voc/scheduler/job/' + oid + "/state", { enabled: true } );
    }

    public disableJob( oid:String ): Observable<any> {
        return this.put( '/api/voc/scheduler/job/' + oid + "/state", { enabled: false } );
    }

    public executeJob( oid:String ): Observable<any> {
        return this.post( '/api/voc/scheduler/job/' + oid + "/execute", {} );
    }

    public getJob( oid:String ): Observable<any> {
        return this.get( '/api/voc/scheduler/job/' + oid );
    }

    public saveJob( job:any ): Observable<any> {
        if ( job.oid ) {
            return this.put( '/api/voc/scheduler/job/' + job.oid, job );
        } else {
            return this.post( '/api/voc/scheduler/job', job );
        }
    }

    public getJobTypes(): Observable<any> {
        return this.get( '/api/voc/scheduler/jobType' );
    }
}
