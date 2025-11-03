import { HttpClient, httpResource, HttpResourceRef } from '@angular/common/http';
import { inject, Injectable, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';

import { API_HOST } from '@demo-app/env';

export interface FooCat {
  created_at: string;
  id: string
  mimetype: string;
  tags: string[];
  url: string;
}
@Injectable({ providedIn: 'root' })
export class FooService {
  readonly #baseUrl = inject(API_HOST);
  readonly #http = inject(HttpClient);

  getFooCat():Observable<FooCat> {
    return this.#http.get<FooCat>(`${this.#baseUrl}/cat`);
  }

  getFooCatResource(phrase: WritableSignal<string>): HttpResourceRef<FooCat | undefined> {
    return httpResource<FooCat>(
      () => `${this.#baseUrl}/cat/says/${phrase()}`,
    );
  }
}
