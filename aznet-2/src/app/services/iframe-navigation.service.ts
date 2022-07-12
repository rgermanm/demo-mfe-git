import { Injectable } from '@angular/core';
import { CheckSessionService } from './check-session.service';
import { EmittersService } from './emitters.service';
import { HistoryState } from '../historyState';
import { Router } from '@angular/router';
import { OPEN2FRAMES, OPENWINDOW, OPENROUTE, SHOWFRAME } from './../modelo/navegacion/acciones';
import { authConfig } from '../config/auth-config';

@Injectable({
  providedIn: 'root'
})

export class IframeNavigationService {

  public lastAction2Frames: action2frames = null;
  public lastActionOpWindow: actionOpWindow = null;

  constructor(private _checkSession: CheckSessionService,
    private _emittersService: EmittersService,
    private _router: Router) {
    this.handleParejasChange();
  }

  execute = (action: action2frames | actionOpWindow): void => {

    this._checkSession.checkSession().then(() => {
      const containerFrame = document.getElementById('CONTAINER');
      this.sendMessage(containerFrame, action);
      console.log(action)
      window.scroll(0, 170);
      if (action.type == OPEN2FRAMES) {
        this.lastAction2Frames = action as action2frames;
      }
      if (action.type == OPENWINDOW) {
        this.lastActionOpWindow = action as actionOpWindow;
      }
    });
  }

  handleParejasChange() {
    this._emittersService.parejasEmitter.subscribe(() => {
      if (this.lastAction2Frames) {
        this.execute(this.lastAction2Frames);
      }
    });
  }

  showHome = (show: boolean) => {
    this._emittersService.hideHome(show)
  }

  sendMessage = (frame, actionObj) => {
    frame.contentWindow.postMessage(JSON.stringify(actionObj), '*');
  }

  openWindowExecute = (objeto) => {
    if (objeto.menuAccion.showFrame == 1) {
      this.showHome(true);
    }
    let action = {
      type: "OPENWINDOW",
      urlWindow: objeto.menuAccion.menuAccionOpenwindows.descUrlOpenwindow,
      windowName: objeto.menuAccion.menuAccionOpenwindows.descNombreWindow,
      windowPreferences:
        objeto.menuAccion.menuAccionOpenwindows.descPreferencias
    };
    this.execute(action);
  }

  twoFramesActionExecute = (objeto) => {

    if (HistoryState.state != "back") {
      var stateObj = { foo: "back" };
      history.pushState(stateObj, "", "");
      history.pushState(stateObj, "", "");
      history.pushState("back", "", "");
      console.log(history)
      HistoryState.state = "back";
    }
    if (objeto.showFrame == 1) {
      this.showHome(true);
    }
    const action = {
      type: 'OPEN2FRAMES',
      urlFrameSelect: objeto.urlFrameSelect,
      urlFrameDatos: objeto.urlFrameDatos
    };
    this.execute(action);
  }


  /* Crea objeto menu pasandole las dos urls para cada frame y concluye con la navegacion*/
  public createNavigate2Frames = (descFrame1, descFrame2) => {
    var menuObj: objetoMenu = new MenuObject().blankMenuObj;
    menuObj.menuAccion.codAccion = OPEN2FRAMES;
    menuObj.menuAccion.menuAccion2frames.descUrlFrame1 = descFrame1;
    menuObj.menuAccion.menuAccion2frames.descUrlFrame2 = descFrame2; 
    menuObj.menuAccion.showFrame = SHOWFRAME;
    this.navigate(menuObj);
  }
  /*Crea objeto menu PARA OPENWINDOW y concluye con la navegacion  */
  public createOpenWindowNavigate = (descUrl: string, windowName: string, windowPref?: string): void => {
    var menuObj: objetoMenu = new MenuObject().blankMenuObj;
    menuObj.menuAccion.codAccion = OPENWINDOW;
    menuObj.menuAccion.menuAccionOpenwindows.descNombreWindow = windowName;
    menuObj.menuAccion.menuAccionOpenwindows.descUrlOpenwindow = descUrl;
    menuObj.menuAccion.menuAccionOpenwindows.descPreferencias = windowPref ? windowPref : null;
    this.navigate(menuObj);
  }

  public navigate = (menuObj: objetoMenu) => {
    switch (menuObj.menuAccion.codAccion) {
      case OPEN2FRAMES:
        let action2frame = {
          type: "OPEN2FRAMES",
          urlFrameSelect: menuObj.menuAccion.menuAccion2frames.descUrlFrame1,
          urlFrameDatos: menuObj.menuAccion.menuAccion2frames.descUrlFrame2,
          showFrame: menuObj.menuAccion.showFrame
        };
        this.twoFramesActionExecute(action2frame);
        break;
      case OPENWINDOW:
        this.openWindowExecute(menuObj);
        break;
      case OPENROUTE:

        let route = menuObj.menuAccion.menuAccionOpenroute.descUrlOpenroute;
        const url = authConfig.azHomeUrl.replace(
          authConfig.baseUrl,
          authConfig.replaceUrl
        );
        document.getElementById('CONTAINER')['src'] = url;
        this._emittersService.hideHome(false)
        this._router.navigate([route]);
        window.scroll(0, 0);
        break;
    }

  }
}



class MenuObject {


  public get blankMenuObj(): objetoMenu {
    return {
      codUbicacion: "",
      descArchivoIcono: "",
      descNombreMenu: "",
      idMenu: 0,
      idMenuPadre: 0,
      indicHijo: "",
      menuAccion: {

        codAccion: "",
        id: 0,
        idMenu: 0,
        menuAccion2frames: {
          descUrlFrame1: "",
          descUrlFrame2: "",
          id: 0,
          idMenuAccion: 0
        },
        menuAccionOpenroute: {
          descUrlOpenroute: "",
          id: 0,
          idMenuAccion: 0,
        },
        menuAccionOpenwindows: {
          descNombreWindow: "",
          descPreferencias: "",
          descUrlOpenwindow: "",
          id: 0,
          idMenuAccion: 0,
        },
        showFrame: 0,


      },
      nroNivel: 0,
      nroOrden: 0
    }
  }

}

export declare type action2frames = { type: 'OPEN2FRAMES' | string, urlFrameDatos: string, urlFrameSelect: string };
export declare type actionOpWindow = { type: 'OPENWINDOW' | string, urlWindow: string, windowName: string, windowPreferences: string };


export interface objetoMenu {
  codUbicacion: string
  descArchivoIcono: string
  descNombreMenu: string
  idMenu: number
  idMenuPadre: number
  indicHijo: string
  menuAccion: {

    codAccion: string
    id: number
    idMenu: number
    menuAccion2frames: {
      descUrlFrame1: string
      descUrlFrame2: string
      id: number
      idMenuAccion: number
    }
    menuAccionOpenroute: {
      descUrlOpenroute: string
      id: number
      idMenuAccion: number
    }
    menuAccionOpenwindows: {
      descNombreWindow: string
      descPreferencias: string
      descUrlOpenwindow: string
      id: number
      idMenuAccion: number
    }
    showFrame: number


  }
  nroNivel: number
  nroOrden: number
}