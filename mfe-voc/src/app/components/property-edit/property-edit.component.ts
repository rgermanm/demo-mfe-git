import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PropertiesService } from '../../services/properties.service';
import { BaseService } from '../../common/services/base.service'; 

@Component({
  selector: 'app-property-edit',
  templateUrl: './property-edit.component.html',
  styleUrls: ['./property-edit.component.css']
})
export class PropertyEditComponent implements OnInit {
    innerForm: FormGroup;
    editProp: any;
    
    constructor(
            private fb: FormBuilder, 
            private service: PropertiesService, 
            private route: ActivatedRoute, 
            private baseService: BaseService) { }

    ngOnInit() {
        let oid = this.route.snapshot.paramMap.get( 'id' );
        
        this.innerForm = this.fb.group( {
            key: new FormControl({value: '', disabled: true}, Validators.required),
            description: ['', Validators.required],
            value: ['', Validators.required]
        } );
        
        this.service.getProperty( oid ).toPromise().then( result => {
            this.editProp=result;
            this.fillForm();
        } ).catch( error => {
            this.baseService.notifyMessage( { message: error, type: 'danger' } );
        } );
    }

    fillForm(){
        this.form.key.setValue(this.editProp.key);
        this.form.description.setValue(this.editProp.description);
        this.form.value.setValue(this.editProp.value);
    }
    
    get form() { return this.innerForm.controls; }

    save() {

        if ( this.innerForm.invalid ) {
            return;
        }
        
        this.editProp.key=this.form.key.value;
        this.editProp.description=this.form.description.value;
        this.editProp.value=this.form.value.value;
        
        this.service.saveProperty( this.editProp ).toPromise().then((  ) => {
            this.baseService.notifyMessage( { message: 'La propiedad se ha grabado', type: 'success' } );
            window.history.back();
        } ).catch(( error ) => {
            this.baseService.notifyMessage( { message: error, type: 'danger' } );
        } );
    }
}
