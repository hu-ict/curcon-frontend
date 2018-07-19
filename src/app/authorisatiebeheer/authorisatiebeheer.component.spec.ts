import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorisatiebeheerComponent } from './authorisatiebeheer.component';

describe('AuthorisatiebeheerComponent', () => {
  let component: AuthorisatiebeheerComponent;
  let fixture: ComponentFixture<AuthorisatiebeheerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthorisatiebeheerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorisatiebeheerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
