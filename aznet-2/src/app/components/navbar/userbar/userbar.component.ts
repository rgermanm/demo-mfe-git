import { Component, OnInit, ViewChild, AfterContentChecked } from "@angular/core";
import { Services } from "../../../services/services.service";
import { FilterByCodUbicacionPipe } from "../../../pipes/filter-by-cod-ubicacion.pipe";
import { FilterMenuAccionPipe } from "../../../pipes/filter-menu-accion.pipe";
import { FilterNroOrdenPipe } from "../../../pipes/filter-nro-orden.pipe";
import { FilterIdPipe } from "../../../pipes/filter-id.pipe";
import { Router } from "@angular/router";
import { BreadCrumb } from "../../hidden-iframe/hidden-iframe.component";
import { EmittersService } from "src/app/services/emitters.service";
import { FilterByIdMenuPipe } from "src/app/pipes/filter-by-id-menu.pipe";
import { authConfig } from './../../../config/auth-config';
import { OPEN2FRAMES } from 'src/app/modelo/navegacion/acciones';
import { IframeNavigationService } from 'src/app/services/iframe-navigation.service';



@Component({
  selector: "app-userbar",
  templateUrl: "./userbar.component.html",
  styleUrls: ["./userbar.component.css"],
  providers: [
    FilterByCodUbicacionPipe,
    FilterMenuAccionPipe,
    FilterNroOrdenPipe,
    FilterIdPipe,
    FilterByIdMenuPipe
  ]
})
export class UserbarComponent implements OnInit, AfterContentChecked {

  
  public notificationCounter:number;
  
  pcSize = false;
  mobileSize = false; 
  ipadSize = false;

  menuUser: boolean = false;
  menuDesp: boolean = false;
  userName: string = authConfig.userName;
  menuAyudaPedidos: boolean = false;
  loaded: boolean = false;
  ayudasLoaded: boolean = false;
  pgLoaded: boolean = false;
  menuUsuario;
  errorMessage;
  menuAyuda;
  pedidoGenerico;
  userInfo;
  notiPEGcant = 0;
  zIndex: false;
  userInfoLoaded = false;
  mostrarPedidosGenericos: boolean = true;
  mostrarAyudas: boolean = true;
  mostrarOcultarMenu: boolean = false;
  loadedFrame: boolean = false;
  showSearch: boolean = false;
  menAyuda;
  hasPareja: boolean;
  breadCrumb: BreadCrumb = {
    lvl1Name: "",
    lvl2Name: "",
    lvl3Name: "",
    lvl4Name: ""
  };

  breadCrumbPg = {
    level1Name: ""
  };

  constructor(
    private services: Services,
    private filterCodUbicacion: FilterByCodUbicacionPipe,
    private filterMenuAccion: FilterMenuAccionPipe,
    private filterNroOrden: FilterNroOrdenPipe,
    private filterId: FilterIdPipe,
    private filterByIdMenu: FilterByIdMenuPipe,
    private router: Router,
    private emittersService: EmittersService,
    private iframeNav: IframeNavigationService,
  ) {

  }

  ngAfterContentChecked() { 
    if (window.screen.width > 991) {
      this.pcSize = true;
      this.mobileSize = false;
      this.ipadSize = false;
    }else if(window.screen.width < 992 && window.screen.width > 450){
      this.pcSize = false;
      this.mobileSize = false;
      this.ipadSize = true;
    }else if(window.screen.width < 451 && window.screen.width > 0){
      this.pcSize = false;
      this.mobileSize = true;
      this.ipadSize = false;
    }
  }
  ngOnInit() {

    this.emittersService.putParejasEmitter.subscribe(() => {

      this.userInfoLoaded = false;
      this.userInfo = false;
      this.loaded = false;
      this.ayudasLoaded = false;
      this.pgLoaded = false;
      this.mostrarPedidosGenericos = true;
      this.mostrarAyudas = true;
      this.obtenerInfoUsuario();
      this.obtenerMenuAyuda();
      this.obtenerMenuPedidosGenericos();
      this.obtenerMenuUsuario();
    });

    this.emittersService.enableActionsEmiter.subscribe((val) => {
      this.loadedFrame = val;
    })

    this.emittersService.ocultarMenuMobileEmitter.subscribe(ocultar => {
      this.menuDesp = ocultar;
    });

    this.emittersService.zindexEmiter.subscribe(zIndex => this.zIndex = zIndex);

    this.emittersService.parejasEmitter.subscribe(val => { this.hasPareja = val; });

    this.obtenerInfoUsuario();
    this.obtenerMenuAyuda();
    this.obtenerMenuPedidosGenericos();
    this.obtenerMenuUsuario();
  
    if (window.screen.width > 991) {
      this.pcSize = true;
      this.mobileSize = false;
      this.ipadSize = false;
    }else if(window.screen.width < 992 && window.screen.width > 450){
      this.pcSize = false;
      this.mobileSize = false;
      this.ipadSize = true;
    }else if(window.screen.width < 451 && window.screen.width > 0){
      this.pcSize = false;
      this.mobileSize = true;
      this.ipadSize = false;
    }
  }  

  public toggleSearch() {
    this.showSearch = !this.showSearch;
    this.menuUser = false;
    this.menuAyudaPedidos = false;
    this.menuDesp = false;
  }

  public obtenerMenuUsuario() {
    this.services
      .getMenuUsuario()
      .then(res => {
        this.menuUsuario = res;
        this.loaded = true;
      })
      .catch(err => {
      });
  }
  public obtenerMenuAyuda() {
this.mostrarAyudas=false;
  }

  public obtenerMenuPedidosGenericos() {

    this.mostrarPedidosGenericos = false;
  }


  public obtenerInfoUsuario() {


    this.services
      .getUserInformation()
      .then(res => {

        this.userInfo = res;
        this.userInfoLoaded = true;
      })
      .catch(err => {
      });
  }
  ocultarMenuUser() {
    this.menuUser = false;
    this.menuDesp = true;
    this.menuAyudaPedidos = false;
  }

  ocultarMenuDesp() {
    this.menuUser = true;
    this.menuDesp = false;
    this.menuAyudaPedidos = false;
  }
  ocultarMenuAyudaPedidos() {
    this.menuAyudaPedidos = true;
    this.menuUser = false;
    this.menuDesp = false;
  }

  obtenerZIndex() {
    let zIndexNav = {
      'z-index': this.zIndex ? 0 : 901,
    };
    return zIndexNav;
  }


  public linkEvent(objetoMenu) {

    this.iframeNav.navigate(objetoMenu)

    if (objetoMenu.menuAccion.codAccion == OPEN2FRAMES) {
      let breadCrumb = {
        lvl1Name: "",
        lvl2Name: "",
        lvl3Name: "",
        lvl4Name: objetoMenu.descNombreMenu
      };
      this.emittersService.originMenuDektop(false)
      this.emittersService.clickedObject(objetoMenu);
      this.emittersService.breadcrumb(breadCrumb);
    }
  }

  public linkEventAyudas(objetoMenu) {

    this.iframeNav.navigate(objetoMenu)

    if (objetoMenu.menuAccion.codAccion == OPEN2FRAMES) {
      this.getParentsNameAyudas(this.menuAyuda, objetoMenu);
      this.emittersService.originMenuDektop(false)
      this.emittersService.clickedObject(objetoMenu);
      this.emittersService.breadcrumb(this.breadCrumb);

      this.emittersService.actualWindow(objetoMenu);
    }
    this.menuAyudaPedidos = !this.menuAyudaPedidos;

  }
  public linkEventPg(objetoMenu) {

    this.iframeNav.navigate(objetoMenu)


    if (objetoMenu.menuAccion.codAccion == OPEN2FRAMES) {
      this.emittersService.originMenuDektop(false)
      let breadCrumb = {
        lvl1Name: "",
        lvl2Name: "",
        lvl3Name: "Pedidos genéricos",
        lvl4Name: objetoMenu.descNombreMenu
      };
      this.emittersService.clickedObject(objetoMenu);
      this.emittersService.breadcrumb(breadCrumb);
    }
    this.menuAyudaPedidos = !this.menuAyudaPedidos;
  }

  public getParentsNameAyudas(menu, menuObj) {
    for (let menuItem of menu) {
      if (menuItem.idMenu == menuObj.idMenuPadre) {
        if (menuItem.nroNivel == "1") {
          // breadCrum.push(menuItem.descNombreMenu);
          this.breadCrumb.lvl2Name = menuItem.descNombreMenu;
        }
        if (menuItem.nroNivel == "2") {
          //breadCrum.push(menuItem.descNombreMenu);
          this.breadCrumb.lvl3Name = menuItem.descNombreMenu;
        }

        this.getParentsNameAyudas(menu, menuItem);
      }
      if (menuItem.descNombreMenu == menuObj.descNombreMenu) {
        this.breadCrumb.lvl4Name = menuObj.descNombreMenu;
      }
    }
  }

  getNestedChildren(arr, parent) {
    let out = [];
    for (let i in arr) {
      if (arr[i].idMenuPadre === parent && arr[i].nroNivel != "5") {
        let children = this.getNestedChildren(arr, arr[i].idMenu);
        if (children.length) {
          arr[i].children = children;
        }
        out.push(arr[i]);
      }
    }
    return out;
  }

  showHome() {
    this.emittersService.hideHome(false);
  }


  readNotification(badgetNoLeidas:any){
   this.notificationCounter=badgetNoLeidas;
  }


}
