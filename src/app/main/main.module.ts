import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from '../shared/modules/shared/shared.module';
import { JsonDataCounterComponent } from './json-data-counter/json-data-counter.component';
import { JsonToExcelComponent } from './json-to-excel/json-to-excel.component';
import { AppRoutingModule } from '../app-routing.module';
import { ExcelToJsonComponent } from './excel-to-json/excel-to-json.component';
import { JsonFormatterComponent } from './json-formatter/json-formatter.component';
import { JsonDataSplitterComponent } from './json-data-splitter/json-data-splitter.component';

// const routes: Routes = [
//   {
//     path: '',
//     component: MainComponent 
//   },
//   {
//     path: 'json-data-counter',
//     component: JsonDataCounterComponent
//   },
//   {
//     path: 'json-to-excel',
//     component: JsonToExcelComponent
//   }

// ]

@NgModule({
  declarations: [
    JsonDataCounterComponent,
    JsonToExcelComponent,
    ExcelToJsonComponent,
    JsonFormatterComponent,
    JsonDataSplitterComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    BrowserModule,
    SharedModule,
    // RouterModule.forChild(routes),
  ]
})
export class MainModule { }
