import { DatePipe } from '@angular/common';
import { Component, OnInit, DoCheck, SimpleChanges, OnChanges } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, DoCheck, OnChanges {
  
  public dateToday?: Date;
  public isDropdownOpen?:boolean = false;

  constructor() { 
  }

  ngOnInit(): void {    
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    console.log("Browser screen width:", screenWidth);
    console.log("Browser screen height:", screenHeight);

  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
    console.log("Dropdown Toggle is: ", this.isDropdownOpen);
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
