import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { auth } from '../../common/model/auth';

@Component({
	selector: 'app-app-init',
	templateUrl: './app-init.component.html',
	styleUrls: ['./app-init.component.css']
})
export class AppInitComponent implements OnInit {

	constructor(private router: Router) { }

	ngOnInit(): void {
		this.router.navigate(['/priv']);
	}

	logged():boolean{
		return auth.hasSession;
	}

}
