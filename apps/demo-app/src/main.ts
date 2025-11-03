import { mergeApplicationConfig } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { loadEnvConfig } from '@demo-app/env';

import { AppComponent } from './app/app';
import { appConfig } from './app/app.config';
import { appConfigBase } from './app/app.config.base';

loadEnvConfig()
  .then(envConfig =>
    bootstrapApplication(
      AppComponent,
      mergeApplicationConfig(envConfig, appConfigBase, appConfig),
    ),
  )
  .catch(err => {
    console.error(err);
  });
