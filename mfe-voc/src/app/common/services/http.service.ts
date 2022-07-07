import { Injectable } from '@angular/core';
import { throwError, Observable} from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { auth } from '../model/auth';


@Injectable({
	providedIn: 'root'
})
export class HttpService {

	constructor(private http: HttpClient) { }

	protected getNoCache<T>(url: string, params?: object): Observable<any> {
		const httpHeaders = new HttpHeaders({
			'Cache-Control': 'no-cache, no-store, must-revalidate, post-check=0, pre-check=0',
			'Pragma': 'no-cache',
			'Expires': '0'
		});
		let tmpUrl = this.formarUrl(url, params);
		return this.http.get<T>(tmpUrl, { headers: httpHeaders }).pipe(map(this.validateResponse), catchError(this.errorHandler));
	}

	protected get<T>(url: string, params?: object): Observable<any> {
		let tmpUrl = this.formarUrl(url, params);
		return this.http.get<T>(tmpUrl).pipe(map(this.validateResponse), catchError(this.errorHandler));
	}

	protected put<T>(url: string, databody: object, params?: object): Observable<any> {
		let tmpUrl = this.formarUrl(url, params);
		return this.http.put<T>(tmpUrl, databody).pipe(map(this.validateResponse), catchError(this.errorHandler));
	}

	protected post<T>(url: string, databody: object, params?: object): Observable<any> {
		let tmpUrl = this.formarUrl(url, params);
		return this.http.post<T>(tmpUrl, databody).pipe(map(this.validateResponse), catchError(this.errorHandler));
	}

	protected delete<T>(url: string, params?: object): Observable<any> {
		let tmpUrl = this.formarUrl(url, params);
		return this.http.delete<T>(tmpUrl).pipe(map(this.validateResponse), catchError(this.errorHandler));
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

	private validateResponse(data: any) {
		if ((data.error) || (data.result == 'Error')) {
			throw data.error ? data.error : 'Error';
		} else {
			return data.result;
		}
	}

	private errorHandler(error: any) {
		if (error instanceof HttpErrorResponse) {
			if ((error.status == 401) || (error.status == 403)) {
				auth.hasSession = false;
				auth.user = null;
				window.location.href = "";
				return throwError("Unauthorized");
			} else {
				return throwError(error.message || "Server Error");
			}
		} else {
			return throwError(error);
		}
	}

}
