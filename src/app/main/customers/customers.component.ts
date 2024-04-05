import { EventEmitter, Component, Input, Output, OnChanges, OnInit, AfterViewInit, SimpleChanges, ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit, AfterViewInit,  OnChanges {

  @Input() inputData: string = '';
  @Input() title: string = ''; 
  @Output() msgEvent = new EventEmitter();

  fullName: string = "";
  counter: number = 0;

  constructor(
    private cd: ChangeDetectorRef,
  ) {}

  ngOnInit(): void{

  }

  sendMessage() {
    this.msgEvent.emit("Customer List");
  }

  ngAfterViewInit(): void {
    console.log("After View Init!");
    this.counter++;
    this.cd.detectChanges();
    console.log("Counter is at: ", this.counter);
  }

  ngAfterViewChecked(): void {
    console.log("After View Checked!");
    this.counter++;
    this.cd.detectChanges();
    console.log("Counter is now at: ", this.counter);
  }

  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      if (propName === 'inputData') {
        const changedProp = changes[propName];
        const newValue = changedProp.currentValue;
        const previousValue = changedProp.previousValue;

        console.log(`ngOnChanges - InputData changed.`, `Previous value: ${previousValue}`, `New value: ${newValue}`);
      }
    }
  }
  
}