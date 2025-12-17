import { Component } from '@angular/core';
import { PanierService } from '../panier-service';
import { Box } from '../Models/iboxes';
import { inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-panier',
  standalone: true,
  imports: [CommonModule, RouterLink, LucideAngularModule],
  templateUrl: './panier.html',
  styleUrl: './panier.css',
})
export class Panier {


  
  panierService = inject(PanierService);
  router = inject(Router)

  isLoading = false;// le client est il en train de payer
  isSuccess =false;// la paiement est il validé





  supprimerArticle(box: Box){
    this.panierService.retirer(box);
  }

  viderPanier(){
    this.panierService.vider();
  }

  passerCommande(){
    // pour lancer l'animation de chargement
    this.isLoading = true;
    
    // on attent 2 secondes pour simuler la banque
    setTimeout(()=>{
      // c'est fini
      this.isLoading = false;
      this.isSuccess = true;

      // on vide la panier 
      this.panierService.vider();
    },2000)
  }
}
