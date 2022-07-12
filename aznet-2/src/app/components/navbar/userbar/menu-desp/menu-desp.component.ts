import { Component, OnInit, Input, ViewChild, } from "@angular/core";
import { NestedTreeControl } from "@angular/cdk/tree";
import { MatTreeNestedDataSource } from "@angular/material/tree";
import { Services } from "../../../../services/services.service";
import { Router, NavigationExtras } from "@angular/router";
import { EmittersService } from "src/app/services/emitters.service";

@Component({
  selector: "app-menu-desp",
  templateUrl: "./menu-desp.component.html",
  styleUrls: ["./menu-desp.component.css"]
})
export class MenuDespComponent implements OnInit {
  //menuDesp: MenuElement[] = [] ;
  menuDesp: MenuElement2[] = [];
  menu;
  public mostrarMenu = true;
  treeControl = new NestedTreeControl<MenuElement2>(node => node.children);
  dataSource = new MatTreeNestedDataSource<MenuElement2>();
  @Input() dataShared: MenuElement2;

  constructor(
    private emittersService: EmittersService,
    private services: Services,
    private router: Router
  ) { }

  //hasChild = (_: number, node: MenuElement) => !!node.childs && node.childs.length > 0;
  hasChild = (_: number, node: MenuElement2) =>
    !!node.children && node.children.length > 0;

  ngOnInit() {
    //   this.menuDesp = this.menuService.getMenu();
    //  this.dataSource.data = this.menuDesp;
    /* this.emittersService.menuPrincipalEmitter.subscribe(menu => {
      this.menu = menu;
      this.dataSource.data = this.getNestedChildren(this.menu, null);
    }) */
    if (localStorage.getItem("menuPrincipal") === null) {
      this.obtenerMenu();
    } else {
      this.menu = JSON.parse(localStorage.getItem("menuPrincipal"));
      this.dataSource.data = this.getNestedChildren(
        JSON.parse(localStorage.getItem("menuPrincipal")),
        null
      );
    }
  }

  //CONSUMO DE MENU SERVICE DESKTOP + LLAMADO A FUNCION DE TRANSFORMACION A ARBOL
  public obtenerMenu() {
    this.services
      .getMenu()
      .then(res => {

        this.menu = res;

        this.dataSource.data = this.getNestedChildren(this.menu, null);
      })
      .catch(err => {

      });
  }

  //TRANSFORMA EL MENU QUE VIENE POR SERVICIO EN ARRAY ANIDADO (ARBOL)
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
  public linkEvent = (objetoMenu) => {
    /* Aca se usa el menu desktop para navegar...... */
    this.emittersService.menuMobileEmitterObj(objetoMenu);
  
    this.emittersService.ocultarMenuMobile(false);

    this.mostrarMenu = !this.mostrarMenu;
  }

  public navegarIframe(objeto) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        urlFrameSelect: objeto.menuAccion.menuAccion2frames.descUrlFrame1, //'/allianz/extranet/cotizacion_cons.propuestaspar?procesar=1514322722',
        urlFrameDatos: "/allianz/extranet/consulta.front" //TODO VERIFICAR URL //'/allianz/extranet/consulta.front'
      }
    };

    this.router.navigate(
      ["/ejemploIframe", objeto.descNombreMenu],
      navigationExtras
    );
  }
}

interface MenuElement2 {
  idMenu: string;
  children?: MenuElement2[];
  idMenuPadre: string;
}
