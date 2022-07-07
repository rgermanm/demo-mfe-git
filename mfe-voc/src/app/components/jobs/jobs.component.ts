import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BaseService } from '../../common/services/base.service';
import { JobsService } from '../../services/jobs.service';
import { jobsModel } from '../../model/jobs.model';
import { JourneyService } from 'src/app/services/journey.service';
import { JourneyModel } from 'src/app/model/journey.model';
import { NxDialogService, NxModalRef } from '@allianz/ngx-ndbx/modal';

@Component({
    selector: 'app-jobs',
    templateUrl: './jobs.component.html',
    styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {
    @ViewChild('template') templateRef: TemplateRef<any>;
    templateDialogRef: NxModalRef<any>;

    tableData = [];
    loading = false;
    total = 0;
    listadoJourneys: JourneyModel[] = [];
    editedRowCode: string;


    constructor(
        private jobsService: JobsService,
        private baseService: BaseService,
        private journeyService: JourneyService,
        private dialogService: NxDialogService
    ) { }

    ngOnInit() {
        if (!this.baseService.isBack()) {
            jobsModel.jobs.tableParams = {
                filter: null,
                page: 1,
                size: 10,
                orderField: 'code',
                inverse: false,
                total: 0
            };
        }
        this.serachJourneys();
        this.search(jobsModel.jobs.tableParams);
    }

    refresh() {
        this.search(jobsModel.jobs.tableParams);
    }


    search(tableParams) {
        this.loading = true;
        this.tableData = [];
        this.total = 0;
        this.jobsService.getJobTable(tableParams).toPromise().then(result => {
            this.tableData = result.data;
            this.total = result.total;
            this.loading = false;
            jobsModel.jobs.tableParams = { ...tableParams }
        }).catch(error => {
            this.loading = false;
            this.baseService.notifyMessage({ message: error, type: 'danger' });
        });
    }

    filter(event) {
        const text = event.target.value.trim();
        let nParams = { ...jobsModel.jobs.tableParams };
        nParams.filter = text;
        nParams.page = 1;
        this.search(nParams);
    }

    changeSizePerPage(event) {
        let nParams = { ...jobsModel.jobs.tableParams };
        nParams.size = event;
        nParams.page = 1;
        this.search(nParams);
    }

    changePage(data) {
        let nParams = { ...jobsModel.jobs.tableParams };
        nParams.page = data;
        this.search(nParams);
    }

    changeSort(field) {
        let nParams = { ...jobsModel.jobs.tableParams };
        if (nParams.orderField == field) {
            nParams.inverse = !nParams.inverse;
        } else {
            nParams.orderField = field;
            nParams.inverse = false;
        }
        this.search(nParams);
    }

    paramsFormatter(data) {
        return JSON.stringify(data);
    }

    delete(row) {
        this.baseService.confirm("Esta seguro desea eliminar la tarea: " + row.code + "?", () => {
            this.jobsService.deleteJob(row.oid).toPromise().then(result => {
                this.search(jobsModel.jobs.tableParams);
                this.baseService.notifyMessage({ message: "La tarea ha sido eliminada", type: 'success' });
            }).catch(error => {
                this.baseService.notifyMessage({ message: error, type: 'danger' });
            });
        });
    }

    disable(row) {
        this.baseService.confirm("Esta seguro desea deshabilitar la tarea: " + row.code + "?", () => {
            this.jobsService.disableJob(row.oid).toPromise().then(result => {
                this.search(jobsModel.jobs.tableParams);
                this.baseService.notifyMessage({ message: "La tarea ha sido deshabilitada", type: 'success' });
            }).catch(error => {
                this.baseService.notifyMessage({ message: error, type: 'danger' });
            });
        });
    }

    enable(row) {
        this.baseService.confirm("Esta seguro desea habilitar la tarea: " + row.code + "?", () => {
            this.jobsService.enableJob(row.oid).toPromise().then(result => {
                this.search(jobsModel.jobs.tableParams);
                this.baseService.notifyMessage({ message: "La tarea ha sido habilitada", type: 'success' });
            }).catch(error => {
                this.baseService.notifyMessage({ message: error, type: 'danger' });
            });
        });
    }

    execute(row) {
        this.baseService.confirm("Esta seguro desea ejecutar la tarea: " + row.code + "?", () => {
            this.jobsService.executeJob(row.oid).toPromise().then(result => {
                this.search(jobsModel.jobs.tableParams);
                this.baseService.notifyMessage({ message: "La tarea ha sido ejecutada", type: 'success' });
            }).catch(error => {
                this.baseService.notifyMessage({ message: error, type: 'danger' });
            });
        });
    }


    // JOURNEYS

    serachJourneys = () => {
        this.journeyService.getJouneysList().toPromise().then(res => {
            this.listadoJourneys = res;
        }).catch(err => {
            console.log(err);
            this.baseService.notifyMessage({ message: err, type: 'danger' });
        })
    }

    editJourney = (journey: JourneyModel, event) => {
        if (this.editedRowCode === 'POP_SINI') {
            journey.isAvailablePopulate = event;
        }
        else {
            journey.isAvailableGenerate = event
        }

        this.journeyService.updateJouney(journey).toPromise().catch(err => {
            console.log(err);
            this.baseService.notifyMessage({ message: err, type: 'danger' });
        })
    }

    openModal(rowCode: string): void {
        this.editedRowCode = rowCode;
        this.templateDialogRef = this.dialogService.open(this.templateRef, { 
            ariaLabel: 'Configuration dialog',
            width: '300px' });
    }

    get tableParams() { return jobsModel.jobs.tableParams; }

}
