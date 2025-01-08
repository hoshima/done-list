import { TestBed } from '@angular/core/testing';

import { ExternalFileService } from './external-file.service';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';

describe('ExternalFileService', () => {
  let service: ExternalFileService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideExperimentalZonelessChangeDetection()],
    });
    service = TestBed.inject(ExternalFileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
