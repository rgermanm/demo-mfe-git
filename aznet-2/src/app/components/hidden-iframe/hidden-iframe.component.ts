import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  Input
} from "@angular/core";
import { WindowService } from "src/app/services/window.service";
import { IframeContainerComponent } from "../aznet/iframe-container/iframe-container.component";
import { UserAgentService } from "src/app/services/user-agent.service";
import { EmittersService } from "../../services/emitters.service";
import { Router } from "@angular/router";
import { authConfig } from "src/app/config/auth-config";
import { IframeNavigationService } from 'src/app/services/iframe-navigation.service';


@Component({
  selector: "app-hidden-iframe",
  templateUrl: "./hidden-iframe.component.html",
  styleUrls: ["./hidden-iframe.component.css"]
})
export class HiddenIframeComponent implements OnInit, AfterViewInit {
  @Input() lvl5: any;

  menuLvl5: any[];
  menuLvl4: any;
  hideHome: boolean = false;
  origenMenuDesktop: boolean = false;
  loadedFavoritos = false;
  errorMessage;
  breadcrumb: BreadCrumb;
  breadCrumbFooter;
  menuFavoritos;
  esFavorito = false;
  actualWidnowObj;
  clickedObject;

  @ViewChild("aznetIframe",{static:true}) menuIframe: IframeContainerComponent;


  private windowUrl = authConfig.azWindowUrl;
  private homeUrl = authConfig.azHomeUrl;

  constructor(
    private router: Router,
    private windowService: WindowService,
    private userAgentService: UserAgentService,
    private emittersService: EmittersService,
    private iframeNav: IframeNavigationService
  ) {
    
    this.esFavorito = false;
  }

  ngOnInit() {
    let url = "";

    url = this.windowUrl.replace(authConfig.baseUrl, authConfig.replaceUrl);

    this.windowService.openAzNetWindow(url, (window) => {

      let urlFrame = "";
      if (!this.userAgentService.isIE()) {
        urlFrame = this.homeUrl.replace(
          authConfig.baseUrl,
          authConfig.replaceUrl
        );
      } else {
        urlFrame = this.homeUrl.replace(
          authConfig.baseUrl,
          authConfig.replaceUrl
        );
      }

      this.menuIframe.changeUrl(urlFrame);

      /*    window.close(); */

    })
  }

  ngAfterViewInit() {
    this.emittersService.originMenuDesktopEmitter.subscribe(
      origenMenuDesktop => (this.origenMenuDesktop = origenMenuDesktop)
    );
    this.emittersService.menuLevel5Emitter.subscribe(
      menu5 => (this.menuLvl5 = menu5)
    );
    this.emittersService.menuLevel4Emitter.subscribe(menu4 => {
      this.menuLvl4 = menu4;
      this.esFavorito = false;
      this.menuFavoritos.forEach(e => {
        if (e.idMenu == this.menuLvl4.idMenu) {
          this.esFavorito = true;
        }
      });
    });
    this.emittersService.clickedObjectEmitter.subscribe(clickObj => {
      this.clickedObject = clickObj;
    });
    this.emittersService.breadCrumbEmitter.subscribe(breadcrumb => {
      this.breadcrumb = breadcrumb;
    });
    this.emittersService.hideHomeEmitter.subscribe(
      hideHome => (this.hideHome = hideHome)
    );
    this.emittersService.actualWindowEmitter.subscribe(
      obj => (this.actualWidnowObj = obj)
    );
    this.emittersService.menuFavoritosEmitter.subscribe(menuFav => {
      this.menuFavoritos = menuFav;

      this.esFavorito = false;
      if (this.menuLvl4) {
        this.menuFavoritos.forEach(e => {
          if (e.idMenu == this.menuLvl4.idMenu) {
            this.esFavorito = true;
          }
        });
      }
    });
  }

  navigate(objetoMenu) {
    this.iframeNav.navigate(objetoMenu)
  }
  agregarFavorito() {
    this.emittersService.hiddenFrameLvl4Emitter(this.menuLvl4);
  }
  clickHandler() {
    if (!this.esFavorito) {
      this.agregarFavorito();
    }
  }
}

export interface BreadCrumb {
  lvl1Name: any; // nos niveles que vienen vacios los seteamos con null o false
  lvl2Name: any;
  lvl3Name: any;
  lvl4Name: any;
}
