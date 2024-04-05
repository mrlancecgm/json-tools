import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { get } from 'http';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  public countResult?=0;

  @ViewChild("jsonInput") jsonInput?: ElementRef;

  ngOnInit(): void {
  }

  startOver() {
    this.countResult = 0;
  }

  getContents(){
    let jsonData = this.jsonInput?.nativeElement.value;    
    let parsedJsonData = JSON.parse(jsonData);
    let jsonTitle = Object.keys(parsedJsonData)[0];
    this.countResult = parsedJsonData[jsonTitle].length;
  }

}