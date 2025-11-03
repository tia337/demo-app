import type { EnvironmentProviders, Provider } from '@angular/core';
import { makeEnvironmentProviders } from '@angular/core';

import { API_HOST } from '../env/api-host';
import { APP_LOGO } from '../env/app-logo';
import type { Environment } from './environment.interface';
import { IS_PRODUCTION } from './is-production';

export function provideEnv({
  apiHost,
  appLogo,
  production,
}: Environment): EnvironmentProviders {
  const providers: Provider[] = [
    {
      provide: API_HOST,
      useValue: apiHost,
    },
    {
      provide: IS_PRODUCTION,
      useValue: production,
    },
    {
      provide: APP_LOGO,
      useValue: appLogo,
    },
  ];

  return makeEnvironmentProviders(providers);
}
