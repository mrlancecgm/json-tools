import { Component } from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-excel-to-json',
  templateUrl: './excel-to-json.component.html',
  styleUrls: ['./excel-to-json.component.scss']
})
export class ExcelToJsonComponent {
  jsonData: any = null;
  excelData: any[] = [];
  jsonPreview: string = '';
  countResult?: number = 0;
  hasFileUploaded?: boolean = false;
  isSuccessfullyLoaded?: boolean=false;
  progress:number=0;
  fileName?:string;

  constructor() { }

  onFileChange(event: any) {
    const file = event.target.files[0];
    const fileName = file.name.toLowerCase();
    const newFileName = fileName.replace(".xlsx",".json");
    this.fileName = newFileName;
    console.log("File Name: ", this.fileName);
    console.log(newFileName);
    if (fileName.endsWith('.xlsx')) {
      this.hasFileUploaded=true;
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
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        this.jsonData = XLSX.utils.sheet_to_json(sheet);
        console.log(this.jsonData);
        this.jsonPreview = JSON.stringify(this.jsonData, null, 2);
        // this.jsonData.forEach((a:any) => {
        //   a.memberCode = a.memberCode.toString();
        // });
        this.countResult = this.jsonData.length;
      };
      reader.readAsArrayBuffer(file);
    } else {
      console.error('Please upload a .xlsx file');
    }
  }

  openFileInput() {
    document.getElementById("jsonUploadTrigger")?.click();    
  }

  downloadJson() {
    if (this.jsonData) {
      console.log("File Name: ", this.fileName);      
      const jsonContent = JSON.stringify(this.jsonData, null, 2);
      const blob = new Blob([jsonContent], { type: 'application/json' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      document.body.appendChild(a);
      a.href = url;
      a.download = this.fileName ? this.fileName : "";
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } else {
      console.error('JSON data is empty or invalid');
    }
  }
}
