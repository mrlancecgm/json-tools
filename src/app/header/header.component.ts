import { DatePipe } from '@angular/common';
import { Component, OnInit, DoCheck, SimpleChanges, OnChanges } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  
  public dateToday?: Date;

  constructor() { 
  }

  ngOnInit(): void {    
  }


}
