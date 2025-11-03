import type { ApplicationConfig } from '@angular/core';

import type { Environment } from './environment.interface';
import { provideEnv } from './provide-env';

export async function loadEnvConfig(): Promise<ApplicationConfig> {
  const link = document.querySelector<HTMLLinkElement>('link[data-env]');

  if (link === null) {
    throw new Error('<link /> with env.json not found');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const response = await fetch(link.href, {
    priority: 'high',
    credentials: 'include',
    mode: 'no-cors',
  });

  // const env = (await response.json()) as Environment;

  const env: Environment = {
    apiHost: 'https://cataas.com',
    appLogo: 'assets/logo.png',
    production: false,
  };

  return { providers: [provideEnv(env)] };
}
