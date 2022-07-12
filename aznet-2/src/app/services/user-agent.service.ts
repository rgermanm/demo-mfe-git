import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserAgentService {

  constructor() { }

  public isIE(): boolean {
    const ua = window.navigator.userAgent;

    const msie = ua.indexOf('MSIE ');
    const trident = ua.indexOf('Trident/');

    return msie > 0 || trident > 0;
  }
}
