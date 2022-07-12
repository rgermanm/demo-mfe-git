import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {
  // private baseUrl = "";
  private baseUrl = "/api";

  constructor(private http: HttpClient) { }

  public getRequest<T>(url: string): Observable<T> {
    return this.http.get<T>(this.baseUrl + url);
  }

  public getRequestParams<T>(url: string, params: object): Observable<T> {
    let tmpUrl = this.formarUrl(url, params);
    return this.http.get<T>(this.baseUrl + tmpUrl);
  }
  public getRequestParamsString<T>(url: string, params: object): Observable<T> {
    let tmpUrl = this.formarUrl(url, params);
    return this.http.get<T>(this.baseUrl + tmpUrl,{ headers: new HttpHeaders({ 'Content-Type': 'application/json', }), responseType: 'text' as 'json' });
  }

  public putRequest<T>(url: string, databody: object, params?: object): Observable<T> {
    let tmpUrl = this.formarUrl(url, params);
    return this.http.put<T>(this.baseUrl + tmpUrl, databody);
  }
  public postRequest<T>(url: string, databody: object, params?: object): Observable<T> {
    let tmpUrl = this.formarUrl(url, params);
    return this.http.post<T>(this.baseUrl + tmpUrl, databody);
  }
  public deleteRequest<T>(url: string, databody: object, params: object): Observable<T> {
    let tmpUrl = this.formarUrl(url, params);
    return this.http.delete<T>(this.baseUrl + tmpUrl);
  }

  private formarUrl(url: string, params: object) {

    let tmpUrl = url;

    if (params != null) {
      tmpUrl = tmpUrl + '?';
      Object.keys(params).forEach((key) => {
        if (params[key] != null) {
          tmpUrl = tmpUrl + encodeURIComponent(key) + "=" + encodeURIComponent(params[key]) + "&";
        }
      });
      tmpUrl = tmpUrl.substring(0, tmpUrl.length - 1);
    }

    return tmpUrl;
  }

  private getHeaderString(headers: HttpHeaders): string {
    const headersString: string = headers
      .keys()
      .map(key => '(' + key + ',' + headers.get(key) + ')')
      .join(', ');

    return headersString;
  }
}
