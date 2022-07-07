import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MailEditComponent } from './mail-edit.component';

describe('MailEditComponent', () => {
  let component: MailEditComponent;
  let fixture: ComponentFixture<MailEditComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MailEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MailEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
