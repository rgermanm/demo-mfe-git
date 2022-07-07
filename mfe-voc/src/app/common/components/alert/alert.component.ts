import { Component, OnInit } from '@angular/core';
import { BaseService } from '../../services/base.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  	message: any;
    title:string;
    text:string;
    type:string;

    constructor(
        private baseService: BaseService
    ) { }

    ngOnInit() {
        this.baseService.getMessage().subscribe( message => {
            this.message = message;
            if (this.message){
                this.title=this.message.type=='confirm'?'Confirme':'Informacion';   
                this.text=this.message.text;
                this.type=this.message.type;
            }
            document.getElementById("alertModalButton").click();
        } );
    }

}
