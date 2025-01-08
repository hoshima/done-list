import { ComponentFixture, TestBed } from '@angular/core/testing';

import TaskListComponent from './task-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from '../../app.routes';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskListComponent, BrowserAnimationsModule],
      providers: [
        provideExperimentalZonelessChangeDetection(),
        provideRouter(routes),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
