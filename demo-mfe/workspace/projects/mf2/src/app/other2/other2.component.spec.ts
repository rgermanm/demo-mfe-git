import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Other2Component } from './other2.component';

describe('Other2Component', () => {
  let component: Other2Component;
  let fixture: ComponentFixture<Other2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Other2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Other2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
