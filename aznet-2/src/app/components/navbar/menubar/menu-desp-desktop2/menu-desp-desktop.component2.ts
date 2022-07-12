import {
  Component,
  OnInit,
  ViewChild,
  HostListener,
  ElementRef
} from "@angular/core";
import { Menu1Service } from "../../../../services/menu.service";
import {
  MenuService
} from "../../../../services/menu-service.service";
import { FilterLvlPipe } from "../../../../pipes/filter-lvl.pipe";
import { Services } from "../../../../services/services.service";
import { UserAgentService } from "src/app/services/user-agent.service";
import { WindowService } from "src/app/services/window.service";
import { AccesosDirectosIconPipe } from "../../../../pipes/accesos-directos-icon.pipe";
import { EmittersService, enumTipoToast } from "src/app/services/emitters.service";
import { BreadCrumb } from "../../../hidden-iframe/hidden-iframe.component";
import { HistoryState } from 'src/app/historyState';
import { OPEN2FRAMES } from 'src/app/modelo/navegacion/acciones';
import { authConfig } from 'src/app/config/auth-config';
import { IframeNavigationService } from 'src/app/services/iframe-navigation.service';

@Component({
  selector: "app-menu-desp-desktop2",
  templateUrl: "./menu-desp-desktop.component2.html",
  styleUrls: ["./menu-desp-desktop.component2.css"],
  providers: [FilterLvlPipe, AccesosDirectosIconPipe]
})
export class MenuDespDesktopComponent2  implements OnInit {
  @ViewChild("tabGroup") tabGroup;

  cotizaciones1: boolean = false;

  breadCrum: BreadCrumb = {
    lvl1Name: "",
    lvl2Name: "",
    lvl3Name: "",
    lvl4Name: ""
  };

  loaded: boolean = false;

  menuDespDesktop: any[] = [];

  menuSelected: any[] = [];
  lvl1Clicked: boolean = false;
  menuRes: any[] = [];
  lvl2;
  arbolResultLevel2Bis: any[] = [];
  menu1: any[] = [];
  idMenuChange: string = "";
  idMenuChange2: string = "";
  errorMessage;
  favoritosIdSet;
  favoritosMenu;
  mostrarMenu: boolean = true;
  agregadoEnFavoritos: boolean;
  loadedFavoritos = false;
  loadedFrame: boolean = false;
  favoritosConBread: menuObjConBreadCrumb[] = [];

  constructor(
    private eRef: ElementRef,
    private services: Services,
    private menuService1: Menu1Service,
    private menuService: MenuService,
    private filterLvl: FilterLvlPipe,
    private iconPipe: AccesosDirectosIconPipe,
    private windowService: WindowService,
    private userAgentService: UserAgentService,
    private emittersService: EmittersService,
    private iframenav: IframeNavigationService

  ) {
    

  }

  ngOnInit() {
    this.emittersService.putParejasEmitter.subscribe(() => {
      // localStorage.removeItem("menuPrincipal");
      this.loadedFavoritos = false;
      this.mostrarMenu = false;
      this.loaded = false;
      this.obtenerMenu();
      // this.obtenerFavoritos();
    });

    this.emittersService.enableActionsEmiter.subscribe((val) => {
      this.loadedFrame = val;

    })

    this.emittersService.menuMobileObjectEmitter.subscribe(objectMenu => {
      this.linkEvent(objectMenu);
    });
    this.emittersService.menuLevel4HiddenFrameEmitter.subscribe(
      OjetoMenulvl4 => {
        this.agregarFavorito(OjetoMenulvl4);
        this.emittersService.menuFavorito(this.favoritosMenu);
      }
    );
    this.obtenerMenu();

  }

  insideOutsideClick;

  @HostListener("document:click", ["$event"])
  clickout(event) {
    if (
      (this.eRef.nativeElement.contains(event.target) ||
        event.target.id == "estrellaFavoritos") &&
      !(event.target.id == "Favoritos" || event.target.id == "itemFavorito")
    ) {
      this.insideOutsideClick = true;
    } else {
      this.insideOutsideClick = false;
      this.lvl1Clicked = false;
    }
  }



  public obtenerFavoritos() {
    this.services
      .getMenuFavoritos()
      .then(res => {
        if (res.length == 0) {
        }

        if (res.length > 0) {
          this.mostrarMenu = true;
        }
        this.emittersService.menuFavorito(res);
        this.favoritosIdSet = res;
        this.favoritosMenu = res.slice();
        this.loadedFavoritos = true;


        this.setIdMenuPadre();
        this.crearMeuFavBread();
        for (let f of res) {
          let element = this.find(this.menu1, f.idMenu);
          element.fav = true;
        }
      })
      .catch(err => {
        this.errorMessage = err;
      });
  }

  public setIdMenuPadre() {
    this.menuRes.forEach(menu => {
      this.favoritosMenu.forEach(favorito => {
        if (menu.idMenu == favorito.idMenu) {
          this.favoritosMenu[this.favoritosMenu.indexOf(favorito)].idMenuPadre =
            menu.idMenuPadre;
        }
      });
    });
  }
  public crearMeuFavBread() {
    this.favoritosMenu.forEach(menu => {
      this.getParentsName(this.menuRes, menu);

      let favoritoConBreadcrumb: menuObjConBreadCrumb = {
        breadcrumb: new Breadcrumbs(this.breadCrum),
        menuObject: menu
      };
      this.favoritosConBread.push(favoritoConBreadcrumb);
    });
  }

  public linkEvent(objetoMenu) {

    this.iframenav.navigate(objetoMenu)
    objetoMenu.menuAccion.codAccion == OPEN2FRAMES ? this.createlvl5(objetoMenu) : "";

    this.lvl1Clicked = !this.lvl1Clicked;

    if (objetoMenu.menuAccion.codAccion == OPEN2FRAMES) {
      this.getParentsName(this.menuRes, objetoMenu);
      this.emittersService.clickedObject(objetoMenu);
      this.emittersService.breadcrumb(this.breadCrum);
      this.emittersService.menuFavorito(this.favoritosMenu);
      this.emittersService.originMenuDektop(true);
    }
  }
  public linkEventFavoritos(objetoMenu) {
    this.lvl1Clicked = false;


    this.iframenav.navigate(objetoMenu)
    objetoMenu.menuAccion.codAccion == OPEN2FRAMES ? this.createlvl5(objetoMenu) : "";

    if (objetoMenu.menuAccion.codAccion == OPEN2FRAMES) {
      let menuObject = objetoMenu;

      if (!objetoMenu.idMenuPadre) {
        this.menu1.forEach(e => {
          if (e.idMenu == objetoMenu.idMenu) menuObject = e;
        });
      }

      this.getParentsName(this.menuRes, menuObject);
      this.emittersService.clickedObject(menuObject);
      this.emittersService.level4Emitter(menuObject);
      this.emittersService.breadcrumb(this.breadCrum);
      this.emittersService.menuFavorito(this.favoritosMenu);
      this.emittersService.originMenuDektop(true);
    }
  }

  public getParentsName(menu, menuObj) {
    for (let menuItem of menu) {
      if (menuItem.idMenu == menuObj.idMenuPadre) {
        if (menuItem.nroNivel == "1") {
          // breadCrum.push(menuItem.descNombreMenu);
          this.breadCrum.lvl1Name = menuItem.descNombreMenu;
        }
        if (menuItem.nroNivel == "2") {
          //breadCrum.push(menuItem.descNombreMenu);
          this.breadCrum.lvl2Name = menuItem.descNombreMenu;
        }
        if (menuItem.nroNivel == "3") {
          // breadCrum.push(menuItem.descNombreMenu);
          this.breadCrum.lvl3Name = menuItem.descNombreMenu;
        }

        this.getParentsName(menu, menuItem);
      }

      if (menuItem.descNombreMenu == menuObj.descNombreMenu) {
        this.breadCrum.lvl4Name = menuObj.descNombreMenu;
      }
    }
  }
  public createlvl5(objeto) {
    //LVL5 LOGICA

    let menu5 = JSON.parse(localStorage.getItem("menucinco"));
    let aryMenu = [];

    menu5.forEach(e => {
      if (objeto.idMenu == e.idMenuPadre) {
        aryMenu.push(e);
      }
    });

    this.emittersService.level4Emitter(objeto);
    if (aryMenu.length != 0) {
      this.emittersService.level5Emitter(aryMenu);
    } else {
      this.emittersService.level5Emitter(false);
    }
  }


  public obtenerMenu() {
    this.services
      .getMenu()
      .then(res => {

        // let menuStorage = JSON.stringify(res);
        //localStorage.setItem("menuPrincipal", menuStorage);

        let nivel5 = [];
        res.forEach(e => {
          if (e.nroNivel == "5") nivel5.push(e);
        });

        this.menuRes = res;
        this.emittersService.emitMenuPrincipal([...this.menuRes]);
        this.menu1 = this.getNestedChildren(res, null);

        localStorage.setItem("menucinco", JSON.stringify(nivel5));

        this.loaded = true;
        if (authConfig.loadedFrame) {

          this.loadedFrame = true;
        }
        this.mostrarMenu = true;
        console.log("MOSTARAR MENU!!!!");
        console.log(this.mostrarMenu);
        this.obtenerFavoritos();
      })
      .catch(err => {
        this.errorMessage = err;
      });
  }
  clickLvl1(lvl1Children) {
    if (lvl1Children == this.lvl2 && this.lvl1Clicked) {
      this.lvl1Clicked = false;
    } else {
      this.lvl2 = lvl1Children;
      if (this.tabGroup != undefined) {
        this.tabGroup.selectedIndex = 0;
      }
      this.lvl1Clicked = true;
    }
  }



  //TRANSFORMA EL MENU QUE VIENE POR SERVICIO EN ARRAY ANIDADO (ARBOL)
  getNestedChildren(arr, parent) {
    let out = [];

    for (let i in arr) {
      if (arr[i].idMenuPadre == parent && arr[i].nroNivel != "5") {
        let children = this.getNestedChildren(arr, arr[i].idMenu);

        if (children.length) {
          arr[i].children = children;
        }
        out.push(arr[i]);
      }
    }
    return out.sort((a, b) => a.nroOrden - b.nroOrden);
  }


  find(source, idMenu) {
    for (let key in source) {
      let item = source[key];
      if (item.idMenu == idMenu)
        return item;

      // Item not returned yet. Search its children by recursive call.
      if (item.children) {
        let subresult = this.find(item.children, idMenu);

        // If the item was found in the subchildren, return it.
        if (subresult)
          return subresult;
      }
    }
    // Nothing found yet? return null.
    return null;
  }


  agregarFavorito(menu4) {

    if (Object.keys(this.favoritosMenu).length < 5) {


      /* this.menu1[this.menu1.indexOf(menu3)].fav = true; */
      //this.menu1.find(x => x.idMenu == menu3.idMenu).fav = true;
      let element = this.find(this.menu1, menu4.idMenu);
      element.fav = true;

      let putMenuItem = {
        MenuUserFavoritoIn: {
          menuUserFavorito: {
            idMenu: menu4.idMenu
          }
        }
      };

      this.favoritosMenu.push(menu4);
      this.getParentsName(this.menuRes, menu4);
      this.services.putFavoritos(putMenuItem);
      this.emittersService.menuFavorito(this.favoritosMenu);

      let favoritoConBreadcrumb: menuObjConBreadCrumb = {
        breadcrumb: new Breadcrumbs(this.breadCrum),
        menuObject: menu4
      };
      this.favoritosConBread.push(favoritoConBreadcrumb);
    } else {
      this.emittersService.emmiterToast(
        enumTipoToast.WARNING,
        "Ha alcanzado el límite máximo de Favoritos."
      );
    }
    // this.emittersService.level4Emitter(menu3);
    // this.emittersService.menuFavorito(this.favoritosMenu);*/

  }


  quitarFavorito(menu4) {
    let element = this.find(this.menu1, menu4.idMenu);
    element.fav = false;
    let deleteItem = {
      idMenu: menu4.idMenu
    };

    let index;

    this.favoritosMenu.splice(
      this.favoritosMenu.indexOf(
        this.favoritosMenu.find(x => x.idMenu == menu4.idMenu)
      ),
      1
    );

    this.favoritosConBread.splice(
      this.favoritosConBread.indexOf(
        this.favoritosConBread.find(x => x.menuObject.idMenu == menu4.idMenu)
      ),
      1
    );
    this.services.deleteFavorito(deleteItem);

    this.emittersService.menuFavorito(this.favoritosMenu);
  }

  quitarFavoritoFromMenuFav(itemFavorito) {

    let element = this.find(this.menu1, itemFavorito.idMenu);
    element.fav = false;

    this.favoritosMenu.splice(
      this.favoritosMenu.indexOf(
        this.favoritosMenu.find(x => x.idMenu == itemFavorito.idMenu)
      ),
      1
    );
    this.favoritosConBread.splice(
      this.favoritosConBread.indexOf(
        this.favoritosConBread.find(
          x => x.menuObject.idMenu == itemFavorito.idMenu
        )
      ),
      1
    );
    let deleteItem = {
      idMenu: itemFavorito.idMenu
    };
    this.services.deleteFavorito(deleteItem);
    this.emittersService.menuFavorito(this.favoritosMenu);
  }
}

export interface menuObjConBreadCrumb {
  breadcrumb: BreadCrumb;
  menuObject;
}

export class Breadcrumbs {
  lvl1Name: string;
  lvl2Name: string;
  lvl3Name: string;
  lvl4Name: string;

  constructor(breadcrumb: BreadCrumb) {
    this.lvl1Name = breadcrumb.lvl1Name;
    this.lvl2Name = breadcrumb.lvl2Name;
    this.lvl3Name = breadcrumb.lvl3Name;
    this.lvl4Name = breadcrumb.lvl4Name;
  }
}
