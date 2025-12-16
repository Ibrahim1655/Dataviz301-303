import { computed, Injectable } from '@angular/core';
import { Box } from './Models/iboxes';
import { signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PanierService {
  //initialisation du panier vide

  articles = signal<Box[]>([])

  total = computed(()=>{
    return this.articles().reduce((acc, Box)=>acc + Box.price,0)
  })


  nombreArticle = computed(()=>{
    return this.articles().length
  })

  ajouter(box:Box){
    this.articles.update(liste =>[...liste , box])
  }
  // on remplace l'ancien panier par le meme panier sans l'articles qu'on souhaite supprimer
  retirer(box:Box){
    this.articles.update(liste => liste.filter(boxdeleted => boxdeleted !== box))
  }

  vider(){
    this.articles.set([])
  }

  

 
  


  
}
