import { TestBed } from '@angular/core/testing';

import { ExternalFileService } from './external-file.service';

describe('ExternalFileService', () => {
  let service: ExternalFileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExternalFileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
