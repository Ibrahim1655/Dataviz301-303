import { Component } from '@angular/core';
import { Navbar } from "../../shared/navbar/navbar";
import { HeaderComponent } from "../../Components/header-component/header-component";
import { RouterOutlet } from '@angular/router';
import { Menu } from '../../menu/menu';

@Component({
  selector: 'app-landing',
  standalone:true,
  imports: [ HeaderComponent, RouterOutlet, Menu],
  templateUrl: './landing.html',
  styleUrl: './landing.css',
})
export class Landing {

}
