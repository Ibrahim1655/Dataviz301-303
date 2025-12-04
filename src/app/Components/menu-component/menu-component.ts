import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Sushi } from '../../Services/sushi';


@Component({
  selector: 'app-menu-component',
  imports: [CommonModule],
  templateUrl: './menu-component.html',
  styleUrl: './menu-component.css',
})
export class MenuComponent {

  constructor(sushi:Sushi){}

}
