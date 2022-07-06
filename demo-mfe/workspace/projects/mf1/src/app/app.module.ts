import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShowInfoComponent } from './show-info/show-info.component';
import { DefaultComponentComponent } from './default-component/default-component.component';

@NgModule({
  declarations: [
    AppComponent,
    ShowInfoComponent,
    DefaultComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
