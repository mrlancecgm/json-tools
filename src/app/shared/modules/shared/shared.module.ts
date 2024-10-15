import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from 'src/app/main/main.component';



@NgModule({
  declarations: [
    MainComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MainComponent,
  ]
})
export class SharedModule { }
