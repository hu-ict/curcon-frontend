import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FunctiemodulesComponent } from './functiemodules.component';

describe('FunctiemodulesComponent', () => {
  let component: FunctiemodulesComponent;
  let fixture: ComponentFixture<FunctiemodulesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FunctiemodulesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FunctiemodulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
