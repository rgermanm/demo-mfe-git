import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { EmittersService } from './../../../services/emitters.service';
import { authConfig } from 'src/app/config/auth-config';

@Component({
    selector: 'app-iframe-container',
    templateUrl: 'iframe-container.component.html'
})
export class IframeContainerComponent implements OnInit {

    public isOpenAznet = false;

    constructor(private emittersService: EmittersService) {

    }

    ngOnInit() {
    }

    changeUrl(url: string): void {
        document.getElementById('CONTAINER')['src'] = url;
        
        //es para todos los que estan fuera del routeroutlet
        setTimeout(()=>{
            this.emittersService.enableActions(true);
        },200)
        //este es para los que estan dentro
        authConfig.loadedFrame = true;
    }
}
