import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FunctiesComponent } from './functies.component';

describe('FunctiesComponent', () => {
  let component: FunctiesComponent;
  let fixture: ComponentFixture<FunctiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FunctiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FunctiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
