import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import { CustomersComponent } from './main/customers/customers.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule } from '@angular/forms';
import { PipeExamplesComponent } from './main/pipe-examples/pipe-examples.component';
import { BirthdayPipe } from './shared/pipes/birthday.pipe';
import { AttributeDirectivesComponent } from './main/attribute-directives/attribute-directives.component';
import { HoverHighlightDirective } from './shared/directives/hover-highlight.directive';
import { StructuralDirectivesComponent } from './main/structural-directives/structural-directives.component';
import { CustomerModule } from './customer/customer.module';
import { CommonModule, DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    CustomersComponent,
    FooterComponent,
    PipeExamplesComponent,
    BirthdayPipe,
    AttributeDirectivesComponent,
    HoverHighlightDirective,
    StructuralDirectivesComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    CustomerModule
  ],
  providers: [DatePipe, Clipboard],
  bootstrap: [AppComponent]
})
export class AppModule { }
