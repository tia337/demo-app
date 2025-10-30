import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatProgressBar } from '@angular/material/progress-bar';

import { LoadingIndicationService } from './loading-indication.service';

@Component({
  selector: 'app-loading',
  template: `
    @if (mode$ | async; as mode) {
    <mat-progress-bar class="progress" [mode]="mode" />
    }
  `,
  styleUrl: './loading-indication.component.scss',
  imports: [AsyncPipe, MatProgressBar],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingIndicatorComponent {
  readonly #loadingService = inject(LoadingIndicationService);

  readonly mode$ = this.#loadingService.mode$;
}
