import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';

import { AuthService } from '@demo-app/env';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [FormsModule],
})
export class LoginComponent {
  readonly #auth = inject(AuthService);
  readonly #destroyRef = inject(DestroyRef);

  readonly email = signal('');
  readonly password = signal('');
  readonly backendError = signal<string | null>(null);
  readonly isLoading = signal(false);

  onSubmit(): void {
    this.isLoading.set(true);

    this.#auth
      .login()
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe({
        next: () => this.isLoading.set(false),
        error: () => {
          this.backendError.set(
            'Login failed due to unknown error. Please try again later.',
          );
          this.isLoading.set(false);
        },
      });
  }
}
