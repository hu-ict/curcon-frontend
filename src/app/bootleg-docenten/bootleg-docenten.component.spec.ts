import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BootlegDocentenComponent } from './bootleg-docenten.component';

describe('BootlegDocentenComponent', () => {
  let component: BootlegDocentenComponent;
  let fixture: ComponentFixture<BootlegDocentenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BootlegDocentenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BootlegDocentenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
