import { TestBed } from '@angular/core/testing';

import { CompanniesService } from './compannies.service';

describe('CompanniesService', () => {
  let service: CompanniesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompanniesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
