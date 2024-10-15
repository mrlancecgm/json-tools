import { ChangeDetectorRef, Component, ElementRef, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
import { parse } from 'path';

@Component({
  selector: 'app-json-formatter',
  templateUrl: './json-formatter.component.html',
  styleUrls: ['./json-formatter.component.scss']
})
export class JsonFormatterComponent {
  public keyArray?:any[]=[];
  public countResult?=0;
  public showInitialDisplay?:boolean=true;
  public showUploadCountDisplay?:boolean=false;
  public formatOneActive?:boolean=false;
  public formatTwoActive?:boolean=false;
  public clipboardValue?: any;
  public progress: number = 0;
  public isSuccessfullyLoaded?:boolean=false;
  public fileValue?: File;
  public hasFileUploaded?: boolean=false;
  public activateFormatButton?:boolean=false;

  @ViewChild("jsonInput") jsonInput?: ElementRef;
  @ViewChild("jsonOutput") jsonOutput?: ElementRef;

  jsonData:any;
  dataCount:number=0;
  constructor(private renderer: Renderer2, private cdref: ChangeDetectorRef) {}

  ngOnInit(): void {
  }

  startOver(event: any) {
    this.countResult = 0;
    this.isSuccessfullyLoaded = false;
    const file:any = event.target;
    console.log("Files", file);
  }  

  startOverUpload() {
    window.location.reload();
  }  

  async pasteFromClipboard() {
    try {
      const clipboardText = await navigator.clipboard.readText();
      console.log('Pasted content:', clipboardText);
      if (this.jsonInput) {
        this.jsonInput.nativeElement.value = clipboardText;
      }
      // Do something with the pasted content
    } catch (error) {
      console.error('Error pasting from clipboard:', error);
    }
  }
  
  activateUploadCountDisplay(){
    this.showInitialDisplay = !this.showInitialDisplay;
    this.showUploadCountDisplay = !this.showUploadCountDisplay;
    this.formatTwoActive = false;
    this.formatOneActive = false;
  }

  openFileInput() {
    document.getElementById("jsonUploadTrigger")?.click();    
  }

  uploadJsonFile(event: any) {
    const file: File = event.target.files[0];
    console.log("File Uploaded",event.target)
    if (file) {
      this.hasFileUploaded = true;
      this.readFile(file);      
    }
  }  

  readFile(file: File) {
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
      const fileContent = e.target.result;
      try {
        this.jsonData = JSON.parse(fileContent);
        let stringJson = JSON.stringify(this.jsonData);
        if (this.jsonInput){
          this.jsonInput.nativeElement.value = stringJson;
        }        
        // this.dataCount = Array.isArray(this.jsonData) ? this.jsonData.length : 0;
        // this.countResult=this.dataCount;
      } catch (error) {
        console.error('Error parsing JSON file:', error);
      }
      this.progress=0;
    };
    
    this.fileValue = file;
    reader.readAsText(file);
  }

  formatJson() {
    let jsonToFormat = this.jsonInput?.nativeElement.value;
    let parseJson = JSON.parse(jsonToFormat);
    let formattedJson = JSON.stringify(parseJson);

    let htmlString = this.generateHtml(parseJson);

    if(this.jsonOutput){
      this.jsonOutput.nativeElement.innerHTML = htmlString;
    }
  }

  generateHtml(json: any): string {
    let html = '';
  
    const generateHtmlRecursive = (obj: any, indent = 0, isArray = false) => {
      const indentStr = '&nbsp;'.repeat(indent * 2);
      if (Array.isArray(obj)) {
        html += '[<br>';
        obj.forEach((item) => {
          if (typeof item === 'object' && item !== null) {
            html += `${indentStr}`;
            generateHtmlRecursive(item, indent + 1, Array.isArray(item));
          } else {
            html += `${indentStr}${item},<br>`;
          }
        });
        html += `${indentStr}]<br>`;
      } else {
        html += '{<br>';
        for (let key in obj) {
          if (obj.hasOwnProperty(key)) {
            let displayKey = `<strong>${key}</strong>: `;
            if (typeof obj[key] === 'object' && obj[key] !== null) {
              html += `${indentStr}${displayKey}`;
              generateHtmlRecursive(obj[key], indent + 1, Array.isArray(obj[key]));
            } else {
              html += `${indentStr}${displayKey}${obj[key]}<br>`;
            }
          }
        }
        html += `${indentStr}}<br>`;
      }
    };
  
    generateHtmlRecursive(json);
    return html;
  } 
  
  getCount(){
    let jsonData = this.jsonInput?.nativeElement.value;    
    let parsedJsonData = JSON.parse(jsonData);
    let jsonTitle:any = Object.keys(parsedJsonData)[0];
    console.log("JSON Title", typeof(jsonTitle));
    if (jsonTitle !== "0"){
      this.countResult = parsedJsonData[jsonTitle].length;
    }
    else{
      this.dataCount = Array.isArray(parsedJsonData) ? parsedJsonData.length : 0;
      console.log('JSON data:', parsedJsonData);
      console.log('Data count:', this.dataCount);
      this.countResult=this.dataCount;
    }    
  }  

  ngAfterContentChecked() {
    if (this.jsonInput?.nativeElement.value){
      this.activateFormatButton = !this.activateFormatButton;
    }
    this.cdref.detectChanges();
  }

  resetFields(){
    if (this.jsonInput?.nativeElement.value){
      this.jsonInput.nativeElement.value = !this.jsonInput.nativeElement.value;
    }
    this.clearOutput();
  }

  clearOutput(){
    if (this.jsonOutput?.nativeElement.innerHTML){
      this.jsonOutput.nativeElement.innerHTML = null;
    }  
  }

  ngOnChanges(changes:SimpleChanges){
    this.progress = changes['progress'].currentValue();
  }
}
