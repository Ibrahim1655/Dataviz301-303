import { Component } from '@angular/core';
import { Navbar } from "../../shared/navbar/navbar";
import { HeaderComponent } from "../../Components/header-component/header-component";
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [HeaderComponent, RouterOutlet],
  templateUrl: './landing.html',
  styleUrl: './landing.css',
})
export class Landing {

}
