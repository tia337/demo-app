import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-bar',
  imports: [],
  templateUrl: './bar.html',
  styleUrl: './bar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export default class BarComponent {}
