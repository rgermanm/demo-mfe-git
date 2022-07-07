import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseService } from 'src/app/common/services/base.service';
import { tableParams } from 'src/app/model/tableParams.model';
import { MailService } from 'src/app/services/mail.service';

@Component({
  selector: 'app-mails',
  templateUrl: './mails.component.html',
  styleUrls: ['./mails.component.css']
})
export class MailsComponent implements OnInit {

  mailForm: FormGroup;
  mailsConfigurations: [] = [];
  tableParams: tableParams;
  total = 0;

  constructor(
    private fb: FormBuilder,
    private mailService: MailService,
    private route: ActivatedRoute,
    private baseService: BaseService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.tableParams = {
      page: 1,
      filter: null,
      inverse: false,
      orderField: null,
      size: 5
    }

    this.search(this.tableParams);
  }

  search(tableParams: tableParams) {
    this.mailService.getMails(tableParams).toPromise().then(result => {
      this.mailsConfigurations = result.data;
      this.total = result.total;
    }).catch(error => {
      console.log(error);
      this.baseService.notifyMessage({ message: error, type: 'danger' });
    });

  }

  delete(mailConfiguration: any) {
    this.baseService.confirm("Esta seguro desea eliminar esta configuracion?", () => {
      this.mailService.deleteMail(mailConfiguration.oid).toPromise().then(result => {
        this.baseService.notifyMessage({ message: "La configuracion a sido eliminado", type: 'success' });
        this.search(this.tableParams);
      }).catch(error => {
        this.baseService.notifyMessage({ message: error, type: 'danger' });
      });
    });
  }


  changeSizePerPage(event) {
    this.tableParams.size = event;
    this.tableParams.page = 1;
    this.search(this.tableParams);
  }

  changePage(data) {
    this.tableParams.page = data;
    this.search(this.tableParams);
  }

  changeSort(field) {
    if (this.tableParams.orderField == field) {
      this.tableParams.inverse = !this.tableParams.inverse;
    } else {
      this.tableParams.orderField = field;
      this.tableParams.inverse = false;
    }
    this.search(this.tableParams);
  }

}
