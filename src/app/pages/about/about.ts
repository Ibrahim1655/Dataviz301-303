import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PanierService } from '../../panier-service';
import { Box } from '../../Models/iboxes';

@Component({
  selector: 'app-about',
  imports: [RouterLink],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {
  private panierService = inject(PanierService);

  // Best-sellers à afficher
  bestSellers: Box[] = [
    {
      id: 101,
      name: 'California Dream',
      pieces: 8,
      price: 14,
      image: '/california-dream.jpg',
      foods: [{ name: 'Saumon', quantity: 4 }, { name: 'Avocat', quantity: 4 }],
      flavors: ['Saumon', 'Avocat', 'Cheese']
    },
    {
      id: 102,
      name: 'Super Salmon',
      pieces: 10,
      price: 16,
      image: '/super-salmon.jpg',
      foods: [{ name: 'Saumon', quantity: 10 }],
      flavors: ['Double saumon frais']
    },
    {
      id: 103,
      name: 'Master Mix',
      pieces: 18,
      price: 22,
      image: '/master-mix.jpg',
      foods: [{ name: 'Assortiment', quantity: 18 }],
      flavors: ['Assortiment varié']
    }
  ];

  ajouterAuPanier(box: Box) {
    this.panierService.ajouter(box);
  }
}
