import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { JobsService } from '../../services/jobs.service';
import { ActivatedRoute } from '@angular/router';
import { BaseService } from '../../common/services/base.service';

@Component({
  selector: 'app-job-edit',
  templateUrl: './job-edit.component.html',
  styleUrls: ['./job-edit.component.css']
})
export class JobEditComponent implements OnInit {

    jobForm: FormGroup;
    title: string;
    editJob: any;
    isEdit:boolean;
    types=[];

    constructor( private fb: FormBuilder, private jobsService: JobsService, private route: ActivatedRoute, private baseService: BaseService ) { }

    ngOnInit() {
        let oid = this.route.snapshot.paramMap.get( 'id' );
        this.isEdit=oid != 'new';
        
        this.jobForm = this.fb.group( {
            code: new FormControl({value: '', disabled: this.isEdit}, Validators.required),
            description: ['', Validators.required],
            enabled: [''],
            type: new FormControl({value: '', disabled: this.isEdit}, Validators.required),
            params: [''],
            cronExpression: ['', Validators.required]
        } );
        
        this.jobsService.getJobTypes().toPromise().then( result => {
            this.types=result;
            if ( !this.isEdit ) {
                this.title = 'Nueva Tarea';
                this.editJob = {
                    oid: null,
                    code: null,
                    description: null,
                    enabled: false,
                    jobTypeOid: null,
                    params: null,
                    cronExpression: null
                }
                this.fillForm();
            } else {
                this.title = 'Editar Tarea';
                this.jobsService.getJob( oid ).toPromise().then( result => {
                    this.editJob=result;
                    this.fillForm();
                } ).catch( error => {
                    this.baseService.notifyMessage( { message: error, type: 'danger' } );
                } );
            }
        } ).catch( error => {
            this.baseService.notifyMessage( { message: error, type: 'danger' } );
        } );
    }

    fillForm(){
        this.form.code.setValue(this.editJob.code);
        this.form.description.setValue(this.editJob.description);
        this.form.enabled.setValue(this.editJob.enabled);
        this.form.type.setValue(this.editJob.jobTypeOid);
        this.form.params.setValue(this.editJob.params?JSON.stringify(this.editJob.params):null);
        this.form.cronExpression.setValue(this.editJob.cronExpression);
    }
    
    get form() { return this.jobForm.controls; }

    save() {
        if (this.form.params.value){
            try{
                JSON.parse(this.form.params.value)
            }
            catch (Exception ){
                this.form.params.setErrors({format:true});
            }
        }
        
        if ( this.jobForm.invalid ) {
            return;
        }
        
        this.editJob.code=this.form.code.value;
        this.editJob.description=this.form.description.value;
        this.editJob.enabled=this.form.enabled.value;
        this.editJob.jobTypeOid=this.form.type.value;
        this.editJob.params=this.form.params.value?JSON.parse(this.form.params.value):null;
        this.editJob.cronExpression=this.form.cronExpression.value;
        
        this.jobsService.saveJob( this.editJob ).toPromise().then(( data ) => {
            this.baseService.notifyMessage( { message: 'La tarea se ha grabado', type: 'success' } );
            window.history.back();
        } ).catch(( error ) => {
            this.baseService.notifyMessage( { message: error, type: 'danger' } );
        } );
    }
}
