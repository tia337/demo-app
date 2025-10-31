import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { FooService } from '@demo-app/foo/data-access';

@Component({
  selector: 'app-foo',
  imports: [
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

  readonly #service = inject(FooService);
  readonly cat$ = this.#service.getFooCat();

  readonly phrase = signal('hello');
  readonly catResource = this.#service.getFooCatResource(this.phrase)
}
