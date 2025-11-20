import { Component, OnInit, signal } from '@angular/core';
import { Box } from './Models/iboxes';
import { Sushi } from './Services/sushi';
import { CommonModule } from '@angular/common';
import { Navbar } from "./shared/navbar/navbar";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    Navbar,
    RouterOutlet
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
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
            name: donnee[0].name,        // nom de la box
            price: donnee[0].price,      // prix de la box
            pieces: donnee[0].pieces,     // nombre de pièces
            foods: donnee[0].foods,       // tableau des aliments
            flavors: donnee[0].flavors   // tableau des saveurs
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
