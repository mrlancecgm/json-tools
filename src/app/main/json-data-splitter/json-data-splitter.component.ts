import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { saveAs } from 'file-saver';
import * as JSZip from 'jszip';

@Component({
  selector: 'app-json-data-splitter',
  templateUrl: './json-data-splitter.component.html',
  styleUrls: ['./json-data-splitter.component.scss']
})
export class JsonDataSplitterComponent implements OnInit {

  jsonData: any = null;
  excelData: any[] = [];
  jsonPreview: string = '';
  countResult?: number = 0;
  hasFileUploaded?: boolean = false;
  isSuccessfullyLoaded?: boolean = false;
  progress: number = 0;
  fileName?: string;
  fileCollection?: any[];

  @ViewChild("lengthJson") lengthJson?: ElementRef;
  @ViewChild("fileNameRequest") fileNameRequest?: ElementRef;

  constructor() { }

  onFileChange(event: any) {
    const file = event.target.files[0];
    const fileName = file.name.toLowerCase();
    if (fileName.endsWith('.json')) {
      this.hasFileUploaded = true;
      const reader = new FileReader();

      reader.onprogress = (event) => {
        if (event.lengthComputable) {
          this.progress = Math.round((event.loaded / event.total) * 100);
          if (this.progress === 100) {
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

  dl(data: any[]) {
    if (data) {
      const jsonContent = JSON.stringify(data, null, 2);
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

  downloadJson() {
    const valueee = this.lengthJson?.nativeElement.value;
    this.fileName = (this.fileNameRequest?.nativeElement.value) + '.json';
    let requestLength: number = parseInt(valueee, 10);
    let obj: { [key: string]: any[] } = {};
    let currentArray: any[] = [];
    let maxLength = requestLength;
    let arrayCounter = 1;
    let jsonLength = this.jsonData.length;
    let remainder = jsonLength % requestLength;
    let whole = Math.floor(jsonLength / requestLength);
    whole = remainder !== 0 ? whole + 1 : whole;

    console.log("Remainder: ", remainder);
    console.log("WHOLE: ", whole);

    let arrayName = "";

    for (let a = 0; a !== whole; a++) {
      arrayName = `array${arrayCounter}`;
      obj[arrayName] = [];
      currentArray = obj[arrayName];
      arrayCounter++;
    }

    let a = 1;
    console.log("OBJ b4: ", obj);
    for (let i = 0; i < this.jsonData.length; i++) {
      let arrayName2 = `array${a}`;
      obj[arrayName2].push(this.jsonData[i]);
      if (obj[arrayName2].length === requestLength) {
        a++;
      }
    }
    console.log("OBJECT: ", obj);


    const finalLength = Object.keys(obj).length;
    this.downloadAsZIP(obj, finalLength);
  }

  downloadAsZIP(jsonFile:{[key: string]: any[]}, arrayLength:number){    
    const zip = new JSZip();

    const fileNameZip = this.fileName?.replace('.json','');

    for (let m = 1; m <= arrayLength; m++) {      
      const toDL = `array${m}`;
      console.log("Array to DL: ", toDL);
      const jsonContent = JSON.stringify(jsonFile[toDL], null, 2);
      zip.file(`${fileNameZip}${m}.json`, jsonContent); 
    }

    zip.generateAsync({ type: 'blob' }).then((content: Blob) => {
      saveAs(content, `${fileNameZip}.zip`); 
    });
  }

  ngOnInit(): void { }
}
