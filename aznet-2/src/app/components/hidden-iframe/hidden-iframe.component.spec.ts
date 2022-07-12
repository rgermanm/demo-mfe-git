import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HiddenIframeComponent } from './hidden-iframe.component';

describe('HiddenIframeComponent', () => {
  let component: HiddenIframeComponent;
  let fixture: ComponentFixture<HiddenIframeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HiddenIframeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HiddenIframeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
