import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { EmittersService } from 'src/app/services/emitters.service';
import { Router } from '@angular/router';
import { faThumbtack } from '@fortawesome/fontawesome-free';
import { authConfig } from 'src/app/config/auth-config';

const LS_STICKYBAR_NAME = "sticky_navmenu";
const TRUE_STRING = "true";
const FALSE_STRING = "false";

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.css']
})

export class MenubarComponent implements OnInit, AfterViewInit {


  public zIndex = false;
  public stickyLock: boolean = true;
  public tooltipText: string;
  faThumbtack = faThumbtack;

  constructor(private emittersService: EmittersService, private router: Router) {

    this.emittersService.zindexEmiter.subscribe(zIndex => this.zIndex = zIndex);

  }

  ngOnInit() { }

  ngAfterViewInit(): void {
    this.loadStickyStatus();
  }

  obtenerZIndex() {
    let zIndexNav = {
      'z-index': this.zIndex ? 0 : 900,
    };
    return zIndexNav;
  }

  showHome() {
    const url = authConfig.azHomeUrl.replace(
      authConfig.baseUrl,
      authConfig.replaceUrl
    );
    document.getElementById('CONTAINER')['src'] = url;
    this.emittersService.hideHome(false);
    this.router.navigate(["home"]);
    window.scroll(0,0);
  }

  public toggleStricky(): void {
    this.stickyLock = !this.stickyLock;
    try {
      window.localStorage.setItem(LS_STICKYBAR_NAME, (this.stickyLock) ? TRUE_STRING : FALSE_STRING);
    } catch (ex) { }
  }

  private loadStickyStatus(): void {
    try {
      let ls_value = window.localStorage.getItem(LS_STICKYBAR_NAME);
      if (ls_value != null) {
        if (ls_value == TRUE_STRING) setTimeout(() => this.stickyLock = true, 0);
        if (ls_value == FALSE_STRING) setTimeout(() => this.stickyLock = false, 0);
      }
    } catch (ex) { }
  }
}
