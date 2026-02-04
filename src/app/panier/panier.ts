import { Component } from '@angular/core';
import { PanierService } from '../panier-service';
import { Box } from '../Models/iboxes';
import { inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { OrderService } from '../Services/order.service';

@Component({
  selector: 'app-panier',
  standalone: true,
  imports: [CommonModule, RouterLink, LucideAngularModule],
  templateUrl: './panier.html',
  styleUrl: './panier.css',
})
export class Panier {



  panierService = inject(PanierService);
  orderService = inject(OrderService);
  router = inject(Router)

  isLoading = false;// le client est il en train de payer
  isSuccess = false;// la paiement est il validé


  extras = {
    sauceSalee: { quantity: 0, price: 0.15, name: 'Sauce Salée' },
    sauceSucree: { quantity: 0, price: 0.15, name: 'Sauce Sucrée' },
    couverts: { quantity: 0, price: 0, name: 'Couverts' }
  };

  incrementerExtra(key: 'sauceSalee' | 'sauceSucree' | 'couverts') {
    this.extras[key].quantity++;
  }

  decrementerExtra(key: 'sauceSalee' | 'sauceSucree' | 'couverts') {
    if (this.extras[key].quantity > 0) {
      this.extras[key].quantity--;
    }
  }

  getTotalExtras(): number {
    return +(
      this.extras.sauceSalee.quantity * this.extras.sauceSalee.price +
      this.extras.sauceSucree.quantity * this.extras.sauceSucree.price +
      this.extras.couverts.quantity * this.extras.couverts.price
    ).toFixed(2);
  }

  getTotalWithExtras(): number {
    return +(this.panierService.total() + this.getTotalExtras()).toFixed(2);
  }



  supprimerArticle(box: Box) {
    this.panierService.retirer(box);
  }

  viderPanier() {
    this.panierService.vider();
  }

  passerCommande() {
    // pour lancer l'animation de chargement
    this.isLoading = true;

    // Sauvegarder les infos avant de vider le panier
    const items = this.panierService.articles();
    const total = this.panierService.total();

    // on attent 2 secondes pour simuler la banque
    setTimeout(() => {
      // c'est fini
      this.isLoading = false;
      this.isSuccess = true;

      // Enregistrer la commande dans l'historique
      this.orderService.addOrder(items, total);

      // on vide la panier 
      this.panierService.vider();
    }, 2000)
  }
}
