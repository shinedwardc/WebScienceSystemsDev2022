import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IndexPageComponent } from './index-page/index-page.component';

import { HeaderComponent } from './header/header.component';
import { InputBoxComponent } from './input-box/input-box.component';
import { GraphsComponent } from './graphs/graphs.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BarChartComponent } from './graphs/bar-chart/bar-chart.component';
import { ScatterComponent } from './graphs/scatter/scatter.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    IndexPageComponent,
    InputBoxComponent,
    GraphsComponent,
    BarChartComponent,
    ScatterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
