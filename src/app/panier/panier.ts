import { Component } from '@angular/core';
import { PanierService } from '../panier-service';
import { Box } from '../Models/iboxes';
import { inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-panier',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './panier.html',
  styleUrl: './panier.css',
})
export class Panier {
  panierService = inject(PanierService);


  supprimerArticle(box: Box){
    this.panierService.retirer(box);
  }

  viderPanier(){
    this.panierService.vider();
  }
}
