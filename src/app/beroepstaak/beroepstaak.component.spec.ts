import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorisatiebeheerComponent } from './beroekstaak.component';

describe('BeroepstaakComponent', () => {
  let component: BeroepstaakComponent;
  let fixture: ComponentFixture<BeroepstaakComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeroepstaakComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeroepstaakComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
