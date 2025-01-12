import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskItemComponent } from './task-item.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from '../../app.routes';
import { Task } from '../../types/task.type';
import { TaskId } from '../../types/branded.type';

describe('TaskItemComponent', () => {
  let component: TaskItemComponent;
  let fixture: ComponentFixture<TaskItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskItemComponent, BrowserAnimationsModule],
      providers: [
        provideExperimentalZonelessChangeDetection(),
        provideRouter(routes),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskItemComponent);
    component = fixture.componentInstance;

    const expectedTask: Task = {
      date: '2021-08-01',
      description: 'description',
      id: crypto.randomUUID() as TaskId,
      name: 'name',
    };
    fixture.componentRef.setInput('task', expectedTask);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
