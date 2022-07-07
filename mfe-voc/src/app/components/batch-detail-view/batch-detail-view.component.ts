import { Component, OnInit } from '@angular/core';
import { BatchService } from '../../services/batch.service';
import { BaseService } from '../../common/services/base.service';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-batch-detail-view',
	templateUrl: './batch-detail-view.component.html',
	styleUrls: ['./batch-detail-view.component.css']
})
export class BatchDetailViewComponent implements OnInit {

	batch: any;
	det: any;
    loading = true;
	activeTab:string='general';

	constructor(private service: BatchService,
		private route: ActivatedRoute,
		private baseService: BaseService) { }

	ngOnInit(): void {
		let oid = this.route.snapshot.paramMap.get('id');		
		let detOid = this.route.snapshot.paramMap.get('dId');
		this.service.getBatch(oid).toPromise().then(result => {
			this.batch = result;
			this.service.getBatchDetail(oid,detOid).toPromise().then(result2 => {
				this.det = result2;
				this.loading=false;
			}).catch(error => {
				this.baseService.notifyMessage({ message: error, type: 'danger' });
			});
		}).catch(error => {
			this.baseService.notifyMessage({ message: error, type: 'danger' });
		});
	}

}
