import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentsModule } from './components/components.module';
import { MaterialModule } from './shared/material/material.module';
import { AppConfirmService } from './services/app-confirm/app-confirm.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ComponentsModule,
    MaterialModule
  ],
  providers: [AppConfirmService],
  bootstrap: [AppComponent]
})
export class AppModule { }
