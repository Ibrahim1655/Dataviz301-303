import { Component, inject, OnInit } from '@angular/core';
import { Sushi } from '../Services/sushi';
import { CommonModule } from '@angular/common';
import { Box } from '../Models/iboxes';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../Components/header-component/header-component';
import { Navbar } from '../shared/navbar/navbar';
//pour pouvoir accès au icônes de Lucide Angular
import { LucideAngularModule } from "lucide-angular";


@Component({
  selector: 'app-menu',
  imports: [RouterOutlet],
  standalone : true,
  templateUrl: './menu.html',
  styleUrl: './menu.css',
})
export class Menu implements OnInit{

  private menuSushi = inject(Sushi)

  boxes : Box[] = []
    

  
ngOnInit(): void {
    // on s'abonne (subscribe) pour récupérer les données de l'API
    this.menuSushi.getBoxes().subscribe((data) => {
      console.log('Données reçues :', data); 
      this.boxes = data;
    });

}



}
