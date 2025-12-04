import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Buttons } from '../../shared/buttons/buttons';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header-component',
  imports: [Buttons, CommonModule, RouterLink], 
  templateUrl: './header-component.html',
  styleUrl: './header-component.css',
})
export class HeaderComponent {

  urlImageSushi : string = "https://sushitaro.fr/wp-content/uploads/2025/04/quel-est-le-meilleur-restaurant-de-sushi-en-France.png"
  commandeButton : string = "Commander"
  
  // Classes pour le titre avec ngClass
  titleClasses: string = "font-['Protest_Revolution'] text-[#EC3C3C] text-[9rem] text-center [text-shadow:2px_2px_4px_rgba(0,0,0,0.5)]";
}
