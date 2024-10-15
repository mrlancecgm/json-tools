import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JsonDataCounterComponent } from './main/json-data-counter/json-data-counter.component';
import { JsonToExcelComponent } from './main/json-to-excel/json-to-excel.component';
import { MainComponent } from './main/main.component';
import { ExcelToJsonComponent } from './main/excel-to-json/excel-to-json.component';
import { JsonFormatterComponent } from './main/json-formatter/json-formatter.component';
import { JsonDataSplitterComponent } from './main/json-data-splitter/json-data-splitter.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent
  },
  {
    path: 'json-data-counter',
    component: JsonDataCounterComponent
  },
  {
    path: 'json-to-excel',
    component: JsonToExcelComponent
  },
  {
    path: 'excel-to-json',
    component: ExcelToJsonComponent
  },
  {
    path: 'json-formatter',
    component: JsonFormatterComponent
  },
  {
    path: 'json-data-splitter',
    component: JsonDataSplitterComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }