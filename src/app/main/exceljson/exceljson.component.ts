import { Component, ViewEncapsulation } from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-exceljson',
  templateUrl: './exceljson.component.html',
  styleUrls: ['./exceljson.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ExceljsonComponent {

  jsonData: any = null;
  excelData: any[] = [];
  jsonPreview: string = '';
  countResult?: number = 0;

  constructor() { }

  onFileChange(event: any) {
    const file = event.target.files[0];
    const fileName = file.name.toLowerCase();
    if (fileName.endsWith('.xlsx')) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        this.jsonData = XLSX.utils.sheet_to_json(sheet);
        this.jsonPreview = JSON.stringify(this.jsonData, null, 2);
        this.countResult = this.jsonData.length;
      };
      reader.readAsArrayBuffer(file);
    } else {
      console.error('Please upload a .xlsx file');
    }
  }

  downloadJson() {
    if (this.jsonData) {
      const jsonContent = JSON.stringify(this.jsonData, null, 2);
      const blob = new Blob([jsonContent], { type: 'application/json' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      document.body.appendChild(a);
      a.href = url;
      a.download = 'Excel to JSON.json';
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } else {
      console.error('JSON data is empty or invalid');
    }
  }
}
