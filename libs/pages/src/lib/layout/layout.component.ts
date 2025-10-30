import { ChangeDetectionStrategy, Component, inject, viewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatListItem, MatNavList } from '@angular/material/list';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';
import { MatToolbar } from '@angular/material/toolbar';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '@demo-app/auth';
import { LoadingIndicatorComponent, NAV_ITEMS } from '@demo-app/env';
import { filter, fromEvent, map, merge, startWith, tap } from 'rxjs';

@Component({
  selector: 'app-layout',
  styleUrl: 'layout.component.scss',
  templateUrl: './layout.component.html',
  imports: [
    RouterOutlet,
    LoadingIndicatorComponent,
    MatToolbar,
    MatIcon,
    MatIconButton,
    MatSidenavContainer,
    MatSidenavContent,
    MatSidenav,
    MatNavList,
    MatListItem,
    RouterLink,
    MatMenu,
    MatMenuTrigger,
    MatMenuItem,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent {
  readonly #auth = inject(AuthService);

  readonly navItems = inject(NAV_ITEMS);

  readonly sideNav = viewChild(MatSidenav);

  readonly #open$ = fromEvent<KeyboardEvent>(window, 'keydown').pipe(
    filter(({ metaKey, code }) => metaKey && code === 'KeyK'),
    map(() => true),
  );
  readonly #closed$ = fromEvent<KeyboardEvent>(window, 'keydown').pipe(
    filter(({ metaKey, code }) => metaKey && code === 'KeyZ'),
    map(() => false),
  );
  readonly #trackSidebarState$ = merge(this.#open$, this.#closed$).pipe(
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    tap(isOpen => this.sideNav()?.toggle(isOpen)),
    startWith(this.sideNav()?.opened ?? false),
    takeUntilDestroyed(),
  );

  constructor() {
    this.#trackSidebarState$.subscribe();
  }

  logout(): void {
    this.#auth.logout();
  }
}
