import { TestBed } from '@angular/core/testing';

import { DatajsService } from './datajs.service';

describe('DatajsService', () => {
  let service: DatajsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatajsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
