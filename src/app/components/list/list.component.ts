import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
  output,
} from '@angular/core';
import { AsyncPipe, DatePipe, JsonPipe } from '@angular/common';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { SupabaseService } from '../../services/supabase.service';
import { Session } from '@supabase/supabase-js';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    DatePipe,
    MatCard,
    MatCardContent,
    MatIconButton,
    MatIcon,
    AsyncPipe,
    JsonPipe,
  ],
  templateUrl: './list.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent implements OnInit {
  readonly #activatedRoute = inject(ActivatedRoute);
  readonly #supabaseService = inject(SupabaseService);
  readonly #cd = inject(ChangeDetectorRef);

  tasks:
    | {
        id: string;
        name: string;
        date: string;
        description: string;
      }[]
    | null = null;

  async ngOnInit(): Promise<void> {
    const session: Session = this.#activatedRoute.snapshot.data['user'];
    this.tasks = (await this.#supabaseService.tasks(session.user.id)).data;
    this.#cd.detectChanges();
  }

  editItem = output<string>();
  deleteItem = output<[string, string]>();

  clickEditItem(id: string) {
    this.editItem.emit(id);
  }

  clickDeleteItem(id: string, name: string) {
    this.deleteItem.emit([id, name]);
  }
}
