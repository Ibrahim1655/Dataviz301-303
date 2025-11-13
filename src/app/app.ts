import { Component, OnInit, signal } from '@angular/core';
import { Box } from './Models/iboxes';
import { Sushi } from './Services/sushi';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit{
  protected readonly title = signal('sushi_crousty');

  public boxes:Box[]=[];
  public ereur:string=""

  // On récupère les sushis provenant du service

  constructor(private sushiService:Sushi){}




  ngOnInit(): void {
    console.log("App component initialisé");
    this.sushiService.getBoxes().subscribe({
      next:(donnee) =>{
        console.log("Boxes reçues:", donnee);
        console.log("Première box:", donnee[0]);
        if (donnee[0]) { // Vérifie si au moins une box existe dans le tableau
          console.log("Structure de la première box:", {
            name: donnee[0].name,        // Nom de la box
            price: donnee[0].price,      // Prix de la box
            pieces: donnee[0].pieces,     // Nombre de pièces
            foods: donnee[0].foods,       // Tableau des aliments
            flavors: donnee[0].flavors   // Tableau des saveurs
          });
        }
        this.boxes = donnee; // Assigne les données reçues à la propriété boxes
      },
      error:(erreur)=>{
        this.ereur ="Erreur";
        console.error("Erreur lors de la récupération des boxes:", erreur);
      }
    
  })
}
}
