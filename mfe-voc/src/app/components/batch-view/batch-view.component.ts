import { Component, OnInit } from '@angular/core';
import { BatchService } from '../../services/batch.service';
import { BaseService } from '../../common/services/base.service';
import { batchsModel } from '../../model/batchs.model'
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-batch-view',
	templateUrl: './batch-view.component.html',
	styleUrls: ['./batch-view.component.css']
})
export class BatchViewComponent implements OnInit {

	to: any;
    tableData = [];
    loadingTO = true;
	loadingDetails = true;
    total = 0;

	constructor(
		private service: BatchService,
		private route: ActivatedRoute,
		private baseService: BaseService) { }

	ngOnInit(): void {
		let oid = this.route.snapshot.paramMap.get('id');
		if (!this.baseService.isBack()) {
            batchsModel.batchDetail.tableParams = {
                filter: null,
                page: 1,
                size: 10,
                orderField: 'custFullname',
                inverse: false,
                total: 0
            };
		}
		this.loadData(oid);
	}
	
	loadData(oid){
	    this.loadingTO = true;
		this.loadingDetails = true;
		this.service.getBatch(oid).toPromise().then(result => {
			this.to = result;
			this.loadingTO=false;
			this.search( batchsModel.batchDetail.tableParams );
		}).catch(error => {
			this.baseService.notifyMessage({ message: error, type: 'danger' });
		});
	}
	
	search( tableParams ) {
        this.loadingDetails = true;
        this.tableData = [];
        this.total = 0;
        this.service.getBatchDetailTable( this.to.oid, tableParams ).toPromise().then( result => {
            this.tableData = result.data;
            this.total = result.total;
            this.loadingDetails = false;
            batchsModel.batchDetail.tableParams = { ...tableParams }
        } ).catch( error => {
            this.loadingDetails = false;
            this.baseService.notifyMessage( { message: error, type: 'danger' } );
        } );
    }

 	filter( event ) {
        const text = event.target.value.trim();
        let nParams = { ...batchsModel.batchDetail.tableParams };
        nParams.filter = text;
        nParams.page = 1;
        this.search( nParams );
    }

	changeSizePerPage( event ) {
        let nParams = { ...batchsModel.batchDetail.tableParams };
        nParams.size = event;
        nParams.page = 1;
        this.search( nParams );
    }

    changePage( data ) {
        let nParams = { ...batchsModel.batchDetail.tableParams };
        nParams.page = data;
        this.search( nParams );
    }

    changeSort( field ) {
        let nParams = { ...batchsModel.batchDetail.tableParams };
        if ( nParams.orderField == field ) {
            nParams.inverse = !nParams.inverse;
        } else {
            nParams.orderField = field;
            nParams.inverse = false;
        }
        this.search( nParams );
    }

	toPending(){
		 this.baseService.confirm( "Esta seguro desea pasar el batch a Pendiente?", ()=> {
	        this.service.toPending(this.to.oid).toPromise().then( result => {
				this.loadData(this.to.oid);
	            this.baseService.notifyMessage( { message: "El batch a sido pasado a pendiente", type: 'success' } );
	        } ).catch( error => {
	            this.baseService.notifyMessage( { message: error, type: 'danger' } );
	        } );
	    } );
	}

	toAbort(){
		 this.baseService.confirm( "Esta seguro desea pasar el batch a Abortado?", ()=> {
	        this.service.toAbort(this.to.oid).toPromise().then( result => {
				this.loadData(this.to.oid);
	            this.baseService.notifyMessage( { message: "El batch a sido pasado a abortado", type: 'success' } );
	        } ).catch( error => {
	            this.baseService.notifyMessage( { message: error, type: 'danger' } );
	        } );
	    } );
	}

	delete(){
		this.baseService.confirm( "Esta seguro desea eliminar el batch?", ()=> {
	        this.service.deleteBatch(this.to.oid).toPromise().then( result => {
	            this.baseService.notifyMessage( { message: "El batch a sido eliminado", type: 'success' } );
				window.history.back();
	        } ).catch( error => {
	            this.baseService.notifyMessage( { message: error, type: 'danger' } );
	        } );
	    } );
	}

 	get tableParams() { return batchsModel.batchDetail.tableParams; }

	get showToPending(){
		return this.baseService.hasPermission("voc_ope")&&this.to&&this.to.state!=='PENDING_GENERATION';
	}

	get showToAbort(){
		return this.baseService.hasPermission("voc_ope")&&this.to&&this.to.state==='PENDING_GENERATION';
	}

	get showDelete(){
		return this.baseService.hasPermission("voc_ope")&&this.to&&this.to.state==='PENDING_GENERATION';
	}


}
