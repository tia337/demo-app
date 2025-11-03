import type { ApplicationConfig } from '@angular/core';

import { provideLoadingIndication, withRouterIndication } from '@demo-app/env';

export const appConfig: ApplicationConfig = {
  providers: [provideLoadingIndication(withRouterIndication())],
};
