import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./Components/header-component/header-component";
import { Navbar } from "./shared/navbar/navbar";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
   
    Navbar
],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected readonly title = signal('sushi_crousty');

  
}
