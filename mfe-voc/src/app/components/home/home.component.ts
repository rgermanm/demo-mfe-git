import { Component, OnInit } from '@angular/core';
import {BaseService} from '../../common/services/base.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	constructor(private baseService:BaseService) { }

	ngOnInit(): void {
	}

	onActivate(event){
      if (!this.baseService.isBack()){
          this.baseService.clearMessage();    
      }
  }
}
