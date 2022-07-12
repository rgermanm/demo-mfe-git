import {
  Component,
  OnInit,
  ViewEncapsulation,
  AfterViewInit
} from "@angular/core";
import { EmittersService } from "src/app/services/emitters.service";
import { permisos } from 'src/app/modelo/permisos/permisos';
import { EvaluaPermiso } from 'src/app/modelo/permisos/EvaluaPermiso';

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit, AfterViewInit {

  appInit: boolean = false;
  hideHome: boolean = false;
  selected = "Novedades";
  showCartera: boolean = false;
  showComercial: boolean = false;
  showKpi: boolean  = false ;
  constructor(
    private eventEmitter: EmittersService,
    private evaluaPermiso: EvaluaPermiso
  ) { }

  ngOnInit() {

    this.showCartera = this.evaluaPermiso.evaluarPermisos([permisos.permisoACartera]);
    this.showComercial = this.evaluaPermiso.evaluarPermisos([permisos.permisoAcomercial]);
    this.showKpi = this.evaluaPermiso.evaluarPermisos([permisos.permisoKpi]);

    this.eventEmitter.hideHomeEmitter.subscribe(
      hideHome => (this.hideHome = hideHome)
    );
  }

  ngAfterViewInit() {
    this.appInit = true;


  }

  tabSelectedChanged(selectedIndex) {
    switch (selectedIndex) {
      case 0: this.selected = 'Novedades';
        break
      case 1: this.selected = 'ACartera';
        break;
      case 2: this.selected = 'AComercial';
      default:
        break;
    }
  }
}
