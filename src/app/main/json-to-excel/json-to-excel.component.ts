import { Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-json-to-excel',
  templateUrl: './json-to-excel.component.html',
  styleUrls: ['./json-to-excel.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class JsonToExcelComponent {
  jsonData: any = null;
  excelData: any[] = [];
  jsonPreview: string = '';
  countResult?: number = 0;
  hasFileUploaded?: boolean = false;
  isSuccessfullyLoaded?: boolean = false;
  progress: number=0;
  fileName?: string;

  // @ViewChild("fileInput") fileInput?: ElementRef;

  constructor() { }

  onFileChange(event: any) {
    const file = event.target.files[0];
    const fileName = file.name.toLowerCase();
    const newFileName = fileName.replace(".json",".xlsx");
    this.fileName = newFileName;
    if (fileName.endsWith('.json')) {
      this.hasFileUploaded = true;
      const reader = new FileReader();

      // Set up progress event listener
      reader.onprogress = (event) => {
        if (event.lengthComputable) {
          this.progress = Math.round((event.loaded / event.total) * 100);
          if(this.progress === 100){
            this.isSuccessfullyLoaded = true;
          }
        }
      };

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

  openFileInput() {
    document.getElementById("jsonUploadTrigger")?.click();    
  }

  downloadExcel() {
    console.log("JSON Data: ", this.jsonData);
    console.log("JSON Length: ", this.jsonData.length);
    console.log("File Name: ", this.fileName);
    if (this.jsonData && this.jsonData.length > 0) {
      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.jsonData);
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
      XLSX.writeFile(wb, this.fileName ? this.fileName : "");
      window.location.reload();
    } else {
      console.log("JSON Data: ", this.jsonData);
      console.error('JSON data is empty or invalid');
    }
  }

  ngDoCheck(){
    console.log("Progress: ", this.progress);
  }
}
