import { BrowserModule } from '@angular/platform-browser';
import { NgModule, TemplateRef, ViewContainerRef } from '@angular/core';
import {  ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { FilterService } from './services/filter.service';
import { DataService } from './services/data.service';
import { ItemsComponent } from './items/items.component';
import { MenuComponent } from './menu/menu.component';
import { MatCardModule, MatMenuModule, MatIconModule, MatFormFieldModule, MatSelectModule, MatButtonModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NouisliderModule } from 'ng2-nouislider';


@NgModule({
  declarations: [
    AppComponent,
    ItemsComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    BrowserAnimationsModule,
    NouisliderModule,
    ReactiveFormsModule,
    MatButtonModule
  ],
  providers: [DataService, FilterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
