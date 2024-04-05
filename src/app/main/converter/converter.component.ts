import { Component, ViewEncapsulation } from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ConverterComponent {

  jsonData: any = null;
  excelData: any[] = [];
  jsonPreview: string = '';
  countResult?: number = 0;
  


  constructor() { }

  onFileChange(event: any) {
    const file = event.target.files[0];
    const fileName = file.name.toLowerCase();
    if (fileName.endsWith('.json')) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.jsonData = JSON.parse(e.target.result);
        this.jsonPreview = JSON.stringify(this.jsonData, null, 2);
        this.countResult = Object.keys(this.jsonData).length;
      };
      reader.readAsText(file);
    } else {
      console.error('Please upload a .json file');
    }
  }

  downloadExcel() {
    if (this.jsonData && this.jsonData.length > 0) {
      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.jsonData);
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
      XLSX.writeFile(wb, 'JSON to Excel.xlsx');
      window.location.reload();
    } else {
      console.error('JSON data is empty or invalid');
    }
  }
}