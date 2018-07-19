import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RollenComponent } from './rollen.component';

describe('RollenComponent', () => {
  let component: RollenComponent;
  let fixture: ComponentFixture<RollenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RollenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RollenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
