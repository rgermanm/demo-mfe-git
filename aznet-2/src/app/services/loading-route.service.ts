import { Injectable } from '@angular/core';
import { Event as RouterEvent } from "@angular/router";
import { Router } from "@angular/router";
import { RouteConfigLoadEnd } from "@angular/router";
import { RouteConfigLoadStart } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class LoadingRouteService {

  public showRouteLoadIndicator: boolean;


  constructor(router: Router) {

    this.showRouteLoadIndicator = false;

    var asyncLoadCount = 0;

    router.events.subscribe(
      (event: RouterEvent): void => {

        if (event instanceof RouteConfigLoadStart) {
          asyncLoadCount++;
        } else if (event instanceof RouteConfigLoadEnd) {

          asyncLoadCount--;

        }
        this.showRouteLoadIndicator = !!asyncLoadCount;
      }
    );

  }
}
