import { TestBed } from '@angular/core/testing';

import { SupabaseService } from './supabase.service';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';

describe('SupabaseService', () => {
  let service: SupabaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideExperimentalZonelessChangeDetection()],
    });
    service = TestBed.inject(SupabaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
