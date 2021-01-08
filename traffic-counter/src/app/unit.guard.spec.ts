import { TestBed } from '@angular/core/testing';

import { UnitGuard } from './unit.guard';

describe('UnitGuard', () => {
  let guard: UnitGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UnitGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
