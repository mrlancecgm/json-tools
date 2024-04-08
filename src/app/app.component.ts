import { Component, ViewEncapsulation } from '@angular/core';
import { VirtualAction } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None 
})
export class AppComponent {
  toggle: boolean = false;

  toggleConverter(): void{
    this.toggle = !this.toggle;
  }
}
