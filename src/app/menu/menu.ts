import { Component, inject, OnInit } from '@angular/core';
import { Sushi } from '../Services/sushi';
import { CommonModule } from '@angular/common';
import { Box } from '../Models/iboxes';
import { RouterOutlet, RouterLink } from '@angular/router';
import { HeaderComponent } from '../Components/header-component/header-component';
import { Navbar } from '../shared/navbar/navbar';
//pour pouvoir accès au icônes de Lucide Angular
import { LucideAngularModule } from "lucide-angular";
import { PanierService } from '../panier-service';


@Component({
  selector: 'app-menu',
  imports: [RouterOutlet, RouterLink],
  standalone: true,
  templateUrl: './menu.html',
  styleUrl: './menu.css',
})
export class Menu implements OnInit {

  private menuSushi = inject(Sushi)
  private panierService = inject(PanierService)

  boxes: Box[] = []
  
  // État pour le toast
  showToast = false;
  toastMessage = '';
  toastTimeout: any;

  // Images de sushi variées pour chaque box
  private sushiImages: string[] = [
    'amateur-mix.jpg',
    'california-dream.jpg',
    'fresh-mix.jpg',
    'gourmet-mix.jpg',
    'master-mix.jpg',
    'salmon-original.jpg',
    'sando-boxchicken.jpg',
    'sando-boxsaumon.jpg',
    'sunrise.jpg',
    'super-salmon.jpg',
  ];



  ngOnInit(): void {
    // on s'abonne (subscribe) pour récupérer les données de l'API
    this.menuSushi.getBoxes().subscribe((data) => {
      console.log('Données reçues :', data);
      // Attribuer une image différente à chaque box
      this.boxes = data.map((box, index) => ({
        ...box,
        image: this.sushiImages[index % this.sushiImages.length]
      }));
    });



  }

  ajouter(box: Box) {
    this.panierService.ajouter(box);
    this.afficherToast(`${box.name} ajouté au panier !`);
  }

  afficherToast(message: string) {
    this.toastMessage = message;
    this.showToast = true;
    
    if (this.toastTimeout) {
      clearTimeout(this.toastTimeout);
    }
    
    this.toastTimeout = setTimeout(() => {
      this.showToast = false;
    }, 3000);
  }



} 
