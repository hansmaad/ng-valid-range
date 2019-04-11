import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NgValidRangeModule } from 'ng-valid-range';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgValidRangeModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
