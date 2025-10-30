import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_HOST } from '@demo-app/env';
import { Observable } from 'rxjs';

export interface Cat {
  created_at: string;
  id: string
  mimetype: string;
  tags: string[];
  url: string;
}
@Injectable({ providedIn: 'root' })
export class CatService {
  readonly #baseUrl = inject(API_HOST);
  readonly #http = inject(HttpClient);

  getCat():Observable<Cat> {
    return this.#http.get<Cat>(`${this.#baseUrl}/cat`);
  }
}
