import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFormComponent } from './search-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';

describe('SearchFormComponent', () => {
  let component: SearchFormComponent;
  let fixture: ComponentFixture<SearchFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchFormComponent, BrowserAnimationsModule],
      providers: [provideExperimentalZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
