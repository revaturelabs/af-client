import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentsModule } from './components/components.module';
import { MaterialModule } from './shared/material/material.module';
import { AppConfirmService } from './services/app-confirm/app-confirm.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { AppLoaderComponent } from './services/app-loader/app-loader.component';
import { AppLoaderService } from './services/app-loader/app-loader.service';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';

@NgModule({
  declarations: [AppComponent, AppLoaderComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ComponentsModule,
    MaterialModule,
    FlexLayoutModule,
    HttpClientModule,
    LoadingBarHttpClientModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-top-right',
      progressBar: false,
      newestOnTop: false,
      maxOpened: 4,
    }),
  ],
  providers: [AppConfirmService, AppLoaderService],
  bootstrap: [AppComponent],
})
export class AppModule {}
