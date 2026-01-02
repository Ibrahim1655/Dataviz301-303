import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./Components/header-component/header-component";
import { Navbar } from "./shared/navbar/navbar";
import { FooterComponent } from "./shared/footer-component/footer-component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    Navbar,
    FooterComponent
],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected readonly title = signal('sushi_crousty');

  
}
