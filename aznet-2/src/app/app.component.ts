import { Component, OnInit } from '@angular/core';
import { authConfig } from './config/auth-config';
import { HistoryState } from './historyState';
import { UserAgentService } from 'src/app/services/user-agent.service';
import { EmittersService, enumTipoToast } from './services/emitters.service';
import { HostListener } from '@angular/core';
import { LoadingRouteService } from './services/loading-route.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Allianznet';
  



  private homeUrl = authConfig.azHomeUrl;
  hideHome: boolean = false;
  popUpBlocked = true;
  ie = true;

  constructor(
    private userAgentService: UserAgentService,
    private emitterService: EmittersService,
    public loadingRoute: LoadingRouteService
    ) {
    this.emitterService.popUpDetectionEmitter.subscribe(x => this.popUpError(x))
    this.ie = this.userAgentService.isIE();
    
  }
  

  ngOnInit() {
    this.emitterService.hideHomeEmitter.subscribe(hideHome => (this.hideHome = hideHome));


  }

  @HostListener('window:popstate', ['$event'])
  onPopState(event) {

    if (HistoryState.state == "back") {
      this.hideHome = false;
      this.emitterService.hideHome(false);
      HistoryState.state = "";
    }
  }


  private popUpError(value) {

    this.popUpBlocked = value;
  }

}
