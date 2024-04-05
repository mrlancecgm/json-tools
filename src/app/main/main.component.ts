import { Component, ElementRef, OnInit, SimpleChange, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  public countResult?=0;
  public showInitialDisplay?:boolean=true;
  public showUploadCountDisplay?:boolean=false;
  public formatOneActive?:boolean=false;
  public formatTwoActive?:boolean=false;
  public clipboardValue?: any;
  public progress: number = 0;
  public isSuccessfullyLoaded?:boolean=false;
  public fileValue?: File;

  @ViewChild("jsonInput") jsonInput?: ElementRef;

  jsonData:any;
  dataCount:number=0;
  constructor() {}

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
  
  activateFormatOne() {
    this.formatOneActive = !this.formatOneActive;
  }

  activateFormatTwo() {
    this.formatTwoActive = !this.formatTwoActive;
    this.formatOneActive = !this.formatOneActive;
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

  ngOnChanges(changes:SimpleChanges){
    this.progress = changes['progress'].currentValue();
  }
}