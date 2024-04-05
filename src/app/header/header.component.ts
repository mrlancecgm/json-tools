import { DatePipe } from '@angular/common';
import { Component, OnInit, DoCheck, SimpleChanges, OnChanges } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, DoCheck, OnChanges {
  
  public dateToday?: Date;

  constructor() { 
  }

  ngOnInit(): void {    
  }

  setTime() {
    this.dateToday= new Date();
  }

  ngDoCheck(): void {
    this.setTime();
    window.setInterval(this.setTime, 1000);
  }
  
  ngOnChanges(changes: SimpleChanges) {
    this.dateToday = changes['dateToday'].currentValue;
    console.log("Date: ", this.dateToday);
  }

}
