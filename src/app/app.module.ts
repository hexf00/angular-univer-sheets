import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { UniverSheetComponent } from './univerSheets/univerSheets.component';

@NgModule({
  declarations: [
    AppComponent,
    UniverSheetComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
