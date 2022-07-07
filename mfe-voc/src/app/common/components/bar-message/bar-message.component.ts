import { Component, OnInit } from '@angular/core';
import { BaseService } from '../../services/base.service';

@Component({
  selector: 'app-bar-message',
  templateUrl: './bar-message.component.html',
  styleUrls: ['./bar-message.component.css']
})
export class BarMessageComponent implements OnInit {

    mensaje:string;
    tipo:string;

    constructor(
            private baseService:BaseService
            ) { }

    ngOnInit() {
        this.baseService.subscribeMessage((event)=>{
            this.mensaje=event.message;
            this.tipo=event.type;
        })
    }
    
    public closeMessage(){
        this.mensaje=null;
    }

}
