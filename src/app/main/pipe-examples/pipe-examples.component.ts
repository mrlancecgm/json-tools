import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-pipe-examples',
  templateUrl: './pipe-examples.component.html',
  styleUrls: ['./pipe-examples.component.scss']
})
export class PipeExamplesComponent implements OnInit {

  text: string = "hello madlang people!";
  currentDate: Date = new Date("1990-10-31T00:00:00.00Z")
  num: number = 3.14159;
  price: string = "9.00";
  percentage: number = 0.45;
  data$ = this.dataService.getData();

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    console.log("Date: ", this.currentDate)
  }

}
