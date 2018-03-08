import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { Tracker } from './tracker/tracker.component';
import { TrackerDetail } from './tracker/tracker-detail.component';
import { TrackerStage } from './tracker/tracker-stage.component';


@NgModule({
  declarations: [
    AppComponent, Tracker,TrackerDetail,TrackerStage
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
