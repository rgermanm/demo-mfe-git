import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'app-paginator',
	templateUrl: './paginator.component.html',
	styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit {

	@Input() page: number;
	@Input() total: number;
	@Input() size: number;

	@Output() changePage: EventEmitter<any> = new EventEmitter();
	@Output() changeSize: EventEmitter<any> = new EventEmitter();

	constructor() { }

	ngOnInit(): void {
	}

	get maxPages() {
		return Math.ceil(this.total / this.size);
	}

	notifyChangeSizePerPage(event) {
		this.changeSize.emit(event.value);
	}

	notifyChangePage(data) {
		this.changePage.emit(data);
	}
}
