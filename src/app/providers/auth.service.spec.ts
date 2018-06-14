import { TestBed, inject } from '@angular/core/testing';

import { \providers\authService } from './\providers\auth.service';

describe('\providers\authService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [\providers\authService]
    });
  });

  it('should be created', inject([\providers\authService], (service: \providers\authService) => {
    expect(service).toBeTruthy();
  }));
});
