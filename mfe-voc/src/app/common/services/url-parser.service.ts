import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class UrlParserService {

	constructor() { }

	public getParamValue(url: string, param: string): string {
		const results = new RegExp('[\?&]' + param + '=([^&#]*)').exec(url);
		if (results == null) {
			return null;
		} else {
			return decodeURI(results[1]) || '';
		}
	}
}
