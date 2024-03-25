import { createStore, select, withProps } from '@ngneat/elf';
import { Injectable } from '@angular/core';

export interface UiProps {
  drawer: { opened: boolean };
}

const store = createStore(
  { name: 'ui' },
  withProps<UiProps>({ drawer: { opened: false } }),
);

@Injectable({ providedIn: 'root' })
export class UiRepository {
  state$ = store.pipe(select((state) => state));
  drawerOpened$ = store.pipe(select((state) => state.drawer.opened));

  openDrawer() {
    store.update((state) => ({
      ...state,
      drawer: {
        opened: true,
      },
    }));
  }

  closeDrawer() {
    store.update((state) => ({
      ...state,
      drawer: {
        opened: false,
      },
    }));
  }
}
