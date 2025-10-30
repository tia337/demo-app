import { inject, Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import type {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { PRIMARY_OUTLET, TitleStrategy } from '@angular/router';

function isPrimaryOutlet({ outlet }: ActivatedRouteSnapshot): boolean {
  return outlet === PRIMARY_OUTLET;
}

const BASE_TITLE = 'Demo App';

@Injectable()
export class FrontTitleStrategy extends TitleStrategy {
  readonly #title = inject(Title);

  override updateTitle({ root }: RouterStateSnapshot): void {
    const result: string[] = [];

    for (
      let route: ActivatedRouteSnapshot | undefined = root;
      route !== undefined;
      route = route.children.find(isPrimaryOutlet)
    ) {
      const title = String(this.getResolvedTitleForRoute(route) ?? '');

      if (title === '' || title === result[result.length - 1]) {
        continue;
      }

      result.push(title);
    }

    if (result.length === 0) {
      this.#title.setTitle(BASE_TITLE);

      return;
    }

    this.#title.setTitle(`${result.join(' › ')} | ${BASE_TITLE}`);
  }
}
