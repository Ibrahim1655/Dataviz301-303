import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Buttons } from '../../shared/buttons/buttons';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header-component',
  imports: [Buttons, CommonModule, RouterLink], 
  templateUrl: './header-component.html',
  styleUrl: './header-component.css',
})
export class HeaderComponent implements OnInit, OnDestroy {

  images: string[] = [
    "https://sushitaro.fr/wp-content/uploads/2025/04/quel-est-le-meilleur-restaurant-de-sushi-en-France.png",
    "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1611143669185-af224c5e3252?q=80&w=1932&auto=format&fit=crop"
  ];

  currentIndex = 0;
  intervalId: any;
  
  // Classes pour le titre avec ngClass
  titleClasses: string = "font-['Protest_Revolution'] text-[#EC3C3C] text-[9rem] text-center [text-shadow:2px_2px_4px_rgba(0,0,0,0.5)]";

  ngOnInit() {
    this.startCarousel();
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  startCarousel() {
    this.intervalId = setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    }, 3000); 
  }
}
