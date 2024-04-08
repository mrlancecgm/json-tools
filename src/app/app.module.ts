import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule } from '@angular/forms';
import { BirthdayPipe } from './shared/pipes/birthday.pipe';
import { HoverHighlightDirective } from './shared/directives/hover-highlight.directive';
import { CommonModule, DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    FooterComponent,
    BirthdayPipe,
    HoverHighlightDirective,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
  ],
  providers: [DatePipe, Clipboard],
  bootstrap: [AppComponent]
})
export class AppModule { }
