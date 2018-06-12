import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RolmodulesComponent } from './rolmodules.component';

describe('RolmodulesComponent', () => {
  let component: RolmodulesComponent;
  let fixture: ComponentFixture<RolmodulesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RolmodulesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RolmodulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
