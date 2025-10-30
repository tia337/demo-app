import { AsyncPipe, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { API_HOST } from '@demo-app/env';

import { CatService } from './services/cats.service';

@Component({
  selector: 'app-foo',
  imports: [
    AsyncPipe,
    NgOptimizedImage,
    FormsModule,
    MatFormField,
    MatInput,
    MatLabel,
    MatFormField,
  ],
  templateUrl: './foo.html',
  styleUrl: './foo.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class FooComponent {
  readonly #baseUrl = inject(API_HOST);
  readonly #service = inject(CatService);
  readonly cat$ = this.#service.getCat();

  // readonly phrase = signal('hello');
  // readonly catResource = httpResource<Cat>(
  //   () => `${this.#baseUrl}/cat/says/${this.phrase()}`,
  // );
}
