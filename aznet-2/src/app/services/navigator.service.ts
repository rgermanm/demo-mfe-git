import { Injectable } from '@angular/core';
import { authConfig } from 'src/app/config/auth-config';

@Injectable({
  providedIn: 'root'
})
export class NavigatorService {

  public readonly extranetURL: string ="/allianz/extranet";
  public urlAz = `https://${authConfig.baseUrl+this.formarUrl()}`;

  constructor() { }

  formarUrl(){
    if(typeof authConfig.production === 'string')
      return authConfig.production ==="true"?".allianznet.com.ar":".allianz.com.ar";
    else return authConfig.production?".allianznet.com.ar":".allianz.com.ar";
  }

  public newWindow(url: string, params?: any, urlTwo?: string, paramsTwo?: any): any{
    if(!url) return null;
    let child = window.open("", "", "width=600,height=600");
    child.document.getElementsByTagName("body")[0].style.padding = "0";
    child.document.getElementsByTagName("body")[0].style.margin = "0";
    child.document.getElementsByTagName("body")[0].style.border = "none";
    child.document.getElementsByTagName("body")[0].style.overflow = "hidden";
    
    let url_destino_one = this.getURLwithParams(this.urlAz + url, params);
    let frameOne = child.document.createElement("iframe");
    frameOne.style.width = "100%";
    frameOne.style.height = "100%";
    frameOne.setAttribute("id", "one");
    frameOne.src = url_destino_one;
    child.document.body.appendChild(frameOne);
    
    if(urlTwo){
      let url_destino_two = this.getURLwithParams(this.urlAz + urlTwo, paramsTwo);
      let frameTwo = child.document.createElement("iframe");
      frameTwo.style.width = "100%";
      frameTwo.style.height = "50%";
      frameTwo.setAttribute("id", "two");
      frameTwo.src = url_destino_two;
      child.document.body.appendChild(frameTwo);
      frameOne.style.height = "50%";
    }
    
    return child;
  }

  public newTab(url: string, params?: any): any{
    if(!url) return null;
    let url_destino = this.getURLwithParams(url, params);
    return window.open(url_destino);
  }

  public addOnCloseListener(ventana, callback: Function){
    ventana.window.onbeforeunload = callback;
  }

  public getURLwithParams(url: string, params?: any): string{
    if(!url) return;
    let url_destino = url;
    if(params){
      let keys = Object.keys(params);
      if(keys.length > 0){
        url_destino += "?";
        for(let i = 0; i < keys.length; i++){
          url_destino += keys[i] + "=" + params[keys[i]];
          if(i != keys.length - 1) url_destino += "&";
        }
      }
    }
    return url_destino;
  }

  
}
