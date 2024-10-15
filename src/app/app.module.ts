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
import { BsDropdownState, MDBBootstrapModule } from 'angular-bootstrap-md';
import { MainModule } from './main/main.module';
import { SharedModule } from './shared/modules/shared/shared.module';
import { RouterModule, RouterOutlet, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';


// const routes : Routes = [
//   {
//     path: '',
//     redirectTo: '/',
//     pathMatch: 'full'
//   }
// ]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    BirthdayPipe,
    HoverHighlightDirective,
    
  ],
  imports: [
    // RouterModule.forRoot(routes),
    BrowserModule,
    RouterOutlet,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
    FormsModule,
    MainModule,
    SharedModule,
    CommonModule,
  ],
  providers: [DatePipe, Clipboard, BsDropdownState],
  bootstrap: [AppComponent]
})
export class AppModule { }
