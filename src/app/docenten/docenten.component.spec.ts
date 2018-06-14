import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocentenComponent } from './docenten.component';

describe('DocentenComponent', () => {
  let component: DocentenComponent;
  let fixture: ComponentFixture<DocentenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocentenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocentenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
