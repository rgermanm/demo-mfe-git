import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MailsComponent } from './mails.component';

describe('MailsComponent', () => {
  let component: MailsComponent;
  let fixture: ComponentFixture<MailsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
