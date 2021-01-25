import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {StoreModule} from '@ngrx/store';
import {reducers} from './store';
import {EffectsModule} from '@ngrx/effects';
import {AuthEffects} from './store/auth/auth.effects';
import {SharedModule} from './_shared/shared.module';
import {AuthModule} from './auth/auth.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([]),
    EffectsModule.forFeature([AuthEffects]),

    SharedModule,
    AuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
