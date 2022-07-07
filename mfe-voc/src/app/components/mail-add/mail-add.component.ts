import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BaseService } from 'src/app/common/services/base.service';
import { MailService } from 'src/app/services/mail.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { mail } from 'src/app/model/mail.model';
@Component({
  selector: 'app-mail-add',
  templateUrl: './mail-add.component.html',
  styleUrls: ['./mail-add.component.css']
})
export class MailAddComponent implements OnInit {

  @ViewChild('inputMail') inputMail: TemplateRef<any>;
  mailConfiguration: mail;
  mailForm: FormGroup;
  types: []

  isEdit: boolean = false;
  isOnlyView: boolean = false;

  jouneys: string[] = [];
  subJouneys: string[] = [];
  branches: string[] = [];

  mailaddList: string[] = [];
  caseOwnerList: string[] = [];
  caseFawList: string[] = [];
  caseLawList: string[] = [];
  caseEscalation1List: string[] = [];
  caseEscalation2List: string[] = [];

  constructor(
    private fb: FormBuilder,
    private mailService: MailService,
    private route: ActivatedRoute,
    private baseService: BaseService
  ) { }

  ngOnInit(): void {

    let oid = this.route.snapshot.paramMap.get('id');
    if (oid === 'view') {
      this.isOnlyView = true;
    } else if (oid === 'new') {
    } else {
      this.isEdit = true;
    }

    this.mailConfiguration = {
      oid: null,
      branch: null,
      caseEscalation1: null,
      caseEscalation2: null,
      caseFAW: null,
      caseLAW: null,
      caseOwner: null,
      interactionPointID: null,
      journey: null,
      subJourney: null,
    }

    this.mailForm = this.fb.group({
      journey: [{ value: '', disabled: this.isEdit || this.isOnlyView }, Validators.required],
      subjourney: [{ value: '', disabled: this.isEdit || this.isOnlyView }, Validators.required],
      branch: [{ value: '', disabled: this.isEdit || this.isOnlyView }, Validators.required],
      interactionPoint: [{ value: '', disabled: this.isEdit || this.isOnlyView }, Validators.required],
    });

    this.searchCombos();
    if (this.isEdit || this.isOnlyView) {
      this.mailService.getMailDetalle(oid).toPromise().then(res => {
        this.mailConfiguration = res;
        this.MailConfigToForm(this.mailConfiguration);
      }).catch(err => {
        console.log(err);
        this.baseService.notifyMessage({ message: err, type: 'danger' });
      })
    }
  }

  private searchCombos() {
    this.jouneys = this.mailService.getJouneys();
    this.subJouneys = this.mailService.getSubJouneys();
    this.branches = this.mailService.getBranches();
  }

  private MailConfigToForm(mailConfig: mail) {
    this.form.journey.setValue(mailConfig.journey);
    this.form.subjourney.setValue(mailConfig.subJourney);
    this.form.branch.setValue(mailConfig.branch);
    this.form.interactionPoint.setValue(mailConfig.interactionPointID);
    this.stringToList(mailConfig.caseOwner, "caseOwnerList");
    this.stringToList(mailConfig.caseFAW, "caseFawList");
    this.stringToList(mailConfig.caseLAW, "caseLawList");
    this.stringToList(mailConfig.caseEscalation1, "caseEscalation1List");
    this.stringToList(mailConfig.caseEscalation2, "caseEscalation2List");
  }

  public addToPendingList() {
    let regex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (this.inputMail['nativeElement']['value'].trim() != '') {
      let accepted = regex.test(this.inputMail['nativeElement']['value'].trim().toLowerCase());
      if (!accepted) {
        this.baseService.notifyMessage({ message: "Formato de mail incorrecto", type: 'danger' });
        return;
      }
      this.mailaddList.push(this.inputMail['nativeElement']['value']);
    } else {
      this.baseService.notifyMessage({ message: "El campo de mail esta incompleto", type: 'danger' });
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }


  save() {
    if (this.mailForm.invalid) {
      return;
    }
    this.mapToMailConfiguration(this.mailConfiguration);
    this.mailService.saveMailConfiguration(this.mailConfiguration).toPromise().then(red => {
      this.baseService.notifyMessage({ message: 'La configuracion se ha grabado', type: 'success' });
      window.history.back();
    }).catch(err => {
      this.baseService.notifyMessage({ message: err, type: 'danger' });
    })

  }

  mapToMailConfiguration = (mail: mail) => {
    mail.branch = this.form.branch.value;
    mail.journey = this.form.journey.value;
    mail.subJourney = this.form.subjourney.value;
    mail.interactionPointID = this.form.interactionPoint.value;
    mail.caseEscalation1 = this.listToString(this.caseEscalation1List);
    mail.caseEscalation2 = this.listToString(this.caseEscalation2List);
    mail.caseFAW = this.listToString(this.caseFawList);
    mail.caseLAW = this.listToString(this.caseLawList);
    mail.caseOwner = this.listToString(this.caseOwnerList);
  }


  private listToString(lista: string[]): string {
    let result = '';
    lista.forEach(val => {
      result = result + val + ';';
    });
    return result;
  }

  private stringToList(string: string, listName: string): void {
    if (string != null) {
      let result = string.split(';');
      result.forEach(val => {
        if (val === '') return;
        this[listName].push(val);
      })
    }
  }



  get form() { return this.mailForm.controls; }
}
