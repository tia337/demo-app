import { computed, inject, Injectable, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { parseAccessJwt } from './jwt/parse-access-jwt';
import { User } from './user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  readonly #router = inject(Router);
  readonly #dialogRef = inject(MatDialog);
  readonly #token = signal(localStorage.getItem('access_token'));

  readonly token = computed(() => {
    const isLoggedIn = this.isLoggedIn();

    if (!isLoggedIn) {
      return '';
    }

    return this.#token();
  });

  readonly user = computed<User>(() => {
    const token = this.#token();
    if (!token) {
      throw new Error('Token missing. User logged out.');
    }

    return parseAccessJwt(token);
  });

  readonly isLoggedIn = computed(() => {
    if (!this.#token()) {
      return false;
    }

    return Date.now() < this.user().exp * 1000;
  });

  login(): void {
    const token = `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJpbGxpYSIsImlhdCI6MTc2MTc0ODA1MSwiZXhwIjoxNzk1OTYyNDUxLCJhdWQiOiJsb2NhbGhvc3Q6NDIwMCIsInN1YiI6InN0dWItdXNlckBnbWFpbC5jb20iLCJ1c2VyX25hbWUiOiJKb2huIERvZSIsInVzZXJfZW1haWwiOiJqcm9ja2V0QGV4YW1wbGUuY29tIiwiZ3JvdXBzIjpbImFkbWluIl19.uEVg6Ys7tA2MHVREE5M2r1Ss3dhrur8nGA19RFm-nsI`;
    localStorage.setItem('access_token', token);
    this.#token.set(token);
    this.#router.navigate([], {
      onSameUrlNavigation: 'reload',
    });
  }

  logout(): void {
    this.#dialogRef.closeAll();

    localStorage.clear();

    this.#token.set('');

    this.#router.navigate([], {
      onSameUrlNavigation: 'reload',
    });
  }
}
