import { Injectable } from '@angular/core';
import { HttpService } from '../common/services/http.service';
import { Observable } from 'rxjs';
import { tableParams } from '../model/tableParams.model';
import { mail } from '../model/mail.model';

@Injectable({
  providedIn: 'root'
})
export class MailService extends HttpService {

  private baseUrl: string = '/api/voc/mail'

  public getMails(tableParams: tableParams): Observable<any> {
    return this.get(this.baseUrl, tableParams);
  }

  public getMailDetalle(oid: string): Observable<mail> {
    return this.get(this.baseUrl + '/' + oid);
  }

  public saveMailConfiguration(mail: mail): Observable<string> {
    if (mail.oid != null) {
      return this.put(this.baseUrl + "/" + mail.oid, mail);
    } else {
      return this.post(this.baseUrl, mail);
    }
  }

  public deleteMail(oid: String): Observable<any> {
    return this.delete(this.baseUrl + "/" +oid);
  }

  public getJouneys(): string[] {
    return [
      '1 - Claims',
      '2 - Sales',
      '3 - Issue Resolution',
      '4 - Renewal & Cancellation',
      '5 - Outbound Comm.'
    ]
  }


  public getSubJouneys(): string[] {
    return [
      '11 - Notification',
      '12 - Issue',
      '13 - Settlement',
      '21 - Quotation',
      '22 - Purchase',
      '30 - Issue Resolution',
      '41 - Termination',
      '42 - Cancellation',
      '43 - Renewal'
    ]
  }


  public getBranches(): string[] {
    return [
      '11 - Motor (MOD)',
      '12 - Motor (MTPL)',
      '13 - Property',
      '21 - Accident',
      '22 - Classic Life',
      '23 - UL',
      '24 - Disabilitty',
      '25 - Term Life',
      '31 - Impatient',
      '32 - OutPatient'
    ]
  }



}
