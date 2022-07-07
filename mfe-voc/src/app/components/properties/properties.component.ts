import { Component, OnInit } from '@angular/core';
import { PropertiesService } from '../../services/properties.service';
import { BaseService } from '../../common/services/base.service';
import { propsModel } from '../../model/props.model';

@Component({
	selector: 'app-properties',
	templateUrl: './properties.component.html',
	styleUrls: ['./properties.component.css']
})
export class PropertiesComponent implements OnInit {

	tableData = [];
	loading = false;
	total = 0;


	constructor(
		private service: PropertiesService,
		private baseService: BaseService) { }

	ngOnInit(): void {
		if (!this.baseService.isBack()) {
			propsModel.properties.tableParams = {
				filter: null,
				page: 1,
				size: 10,
				orderField: 'key',
				inverse: false,
				total: 0
			};
		}
		this.search(propsModel.properties.tableParams);
	}

	refresh() {
		this.search(propsModel.properties.tableParams);
	}

	search(tableParams: any) {
		this.loading = true;
		this.tableData = [];
		this.total = 0;
		this.service.getPropertiesTable(tableParams).toPromise().then(result => {
			this.tableData = result.data;
			this.total = result.total;
			this.loading = false;
			propsModel.properties.tableParams = { ...tableParams }
		}).catch(error => {
			this.loading = false;
			this.baseService.notifyMessage({ message: error, type: 'danger' });
		});
	}

	filter(event:any) {
		const text = event.target.value.trim();
		let nParams = { ...propsModel.properties.tableParams };
		nParams.filter = text;
		nParams.page = 1;
		this.search(nParams);
	}

	changeSizePerPage(event:any) {
		let nParams = { ...propsModel.properties.tableParams };
		nParams.size = event;
		nParams.page = 1;
		this.search(nParams);
	}

	changePage(data:number) {
		let nParams = { ...propsModel.properties.tableParams };
		nParams.page = data;
		this.search(nParams);
	}

	changeSort(field) {
		let nParams = { ...propsModel.properties.tableParams };
		if (nParams.orderField == field) {
			nParams.inverse = !nParams.inverse;
		} else {
			nParams.orderField = field;
			nParams.inverse = false;
		}
		this.search(nParams);
	}

	get tableParams() { return propsModel.properties.tableParams; }

}
