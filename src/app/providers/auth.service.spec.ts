import { TestBed, inject } from '@angular/core/testing';

import { \providers\authService } from './\providers\auth.service';

describe('\providers\authService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [\providers\authService]
    });
  });

  it('should be created', inject([\providers\authService], (service: \providers\authService) => {

import { AuthService } from './auth.service';

describe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService]
    });
  });

  it('should be created', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));
});
