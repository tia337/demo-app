import { mergeApplicationConfig } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app';
import { appConfig } from './app/app.config';
import { appConfigBase } from './app/app.config.base';

bootstrapApplication(
  AppComponent,
  mergeApplicationConfig(appConfigBase, appConfig),
).catch(err => console.error(err));
