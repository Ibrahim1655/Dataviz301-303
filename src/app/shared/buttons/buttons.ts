import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-buttons',
  imports: [CommonModule],
  templateUrl: './buttons.html',
  styleUrl: './buttons.css',
})
export class Buttons {
  commandeButton : string = "Commander"
  buttonClasses: string = "bg-[#DEBA97] text-white px-20 py-3 rounded-2xl hover:bg-[#C49564] transition-colors duration-300 cursor-pointer";
  
  constructor(){
    this.commandeButton = "Commander";
  }
}
