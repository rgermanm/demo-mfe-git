import { Injectable } from '@angular/core';
import { EmittersService } from './emitters.service';
import { UserAgentService } from './user-agent.service';
import { authConfig } from '../config/auth-config';
@Injectable({
  providedIn: 'root'
})
export class WindowService {
  constructor(private emittersService: EmittersService, private userAgentService: UserAgentService) { }

  private noSelectableWindowPreferences = 'toolbar=no,status=no,menubar=no,scrollbars=no,resizable=no,left=20000, top=20000, width=10, height=10, visible=none';

  public getBrowserName() {
    const agent = window.navigator.userAgent.toLowerCase()
    switch (true) {
      case agent.indexOf('edge') > -1:
        return 'edge';
      case agent.indexOf('opr') > -1 && !!(<any>window).opr:
        return 'opera';
      case agent.indexOf('chrome') > -1 && !!(<any>window).chrome:
        return 'chrome';
      case agent.indexOf('trident') > -1:
        return 'ie';
      case agent.indexOf('firefox') > -1:
        return 'firefox';
      case agent.indexOf('crios') > -1:
        return 'chrome';
      case agent.indexOf('safari') > -1:
        return 'safari';
      default:
        return 'other';
    }
  }
  // Metodo para abrir un popup no visible para obtener el seteo de informacion de autenticacion en el iframe
  // luego de que se autentico sobre la aplicacion
  public openAzNetWindow(url: string, callback?: (window) => void): void {

    const loginWindow = window.open(url, '', this.noSelectableWindowPreferences);

    if (loginWindow == null || typeof (loginWindow) == 'undefined' || !loginWindow) {
      this.emittersService.notifyPopUpBlocked(false);
    } else {

      const onCloseWindow = function () {
        callback(loginWindow);
      };

      loginWindow.onloadeddata = new onCloseWindow();
    }
  }

}