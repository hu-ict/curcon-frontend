import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeroepstaakXComponent } from './beroepstaak-x.component';

describe('BeroepstaakXComponent', () => {
  let component: BeroepstaakXComponent;
  let fixture: ComponentFixture<BeroepstaakXComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeroepstaakXComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeroepstaakXComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
