import { Component, OnInit } from '@angular/core';
import { BaseService } from '../../common/services/base.service';
import { BatchService } from '../../services/batch.service';
import { batchsModel } from '../../model/batchs.model';

@Component({
  selector: 'app-batchs',
  templateUrl: './batchs.component.html',
  styleUrls: ['./batchs.component.css']
})
export class BatchsComponent implements OnInit {
    tableData = [];
    loading = false;
    total = 0;

    constructor(
        private service: BatchService,
        private baseService: BaseService
    ) { } 

    ngOnInit() {
        if ( !this.baseService.isBack() ) {
            batchsModel.batch.tableParams = {
                filterState: null,
				filterCategory: null,
                page: 1,
                size: 10,
                orderField: 'createTimestamp',
                inverse: true,
                total: 0
            };
        }
        this.search( batchsModel.batch.tableParams );
    }

    search( tableParams ) {
        this.loading = true;
        this.tableData = [];
        this.total = 0;
        this.service.getBatchTable( tableParams ).toPromise().then( result => {
            this.tableData = result.data;
            this.total = result.total;
            this.loading = false;
            batchsModel.batch.tableParams = { ...tableParams }
        } ).catch( error => {
            this.loading = false;
            this.baseService.notifyMessage( { message: error, type: 'danger' } );
        } );
    }

    filterCategory( text ) {
        let nParams = { ...batchsModel.batch.tableParams };
        nParams.filterCategory = text===''?null:text;
        nParams.page = 1;
        this.search( nParams );
    }

 	filterState( text ) {
        let nParams = { ...batchsModel.batch.tableParams };
        nParams.filterState = text===''?null:text;
        nParams.page = 1;
        this.search( nParams );
    }

    changeSizePerPage( event ) {
        let nParams = { ...batchsModel.batch.tableParams };
        nParams.size = event;
        nParams.page = 1;
        this.search( nParams );
    }

    changePage( data ) {
        let nParams = { ...batchsModel.batch.tableParams };
        nParams.page = data;
        this.search( nParams );
    }

    changeSort( field ) {
        let nParams = { ...batchsModel.batch.tableParams };
        if ( nParams.orderField == field ) {
            nParams.inverse = !nParams.inverse;
        } else {
            nParams.orderField = field;
            nParams.inverse = false;
        }
        this.search( nParams );
    }

    get tableParams() { return batchsModel.batch.tableParams; }

}
