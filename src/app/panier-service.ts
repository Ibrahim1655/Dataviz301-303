import { computed, Injectable  , signal , effect} from '@angular/core';
import { Box } from './Models/iboxes';

@Injectable({
  providedIn: 'root',
})
export class PanierService {

private readonly STORAGE_KEY = 'panier_sushi_crousty';

  
  // On essaye de lire le localStorage immédiatement lors de la création du signal
  public articles = signal<Box[]>(this.getPanierFromStorage());

  total = computed(() => {
    return this.articles().reduce((acc, Box)=>acc + Box.price,0)
  })


  nombreArticle = computed(()=> {
    return this.articles().length
  })

  constructor(){
    // L'effect se lance à chaque fois que 'this.articles()' change.
    // dans le constructeur pourque le panier soit surveillé toute la durée de vie du service 
    effect(() => {
      const data = JSON.stringify(this.articles());
      localStorage.setItem(this.STORAGE_KEY, data);
      
      console.log('Sauvegarde auto effectuée !'); // Pour vérifier dans la console
    });
    
    
  }

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
  private getPanierFromStorage(): Box[] {
    
    if (typeof localStorage !== 'undefined') {
      const articleDuPanier = localStorage.getItem(this.STORAGE_KEY);
      // Si des données existent, on les transforme en objet, sinon tableau vide
      return articleDuPanier ? JSON.parse(articleDuPanier) : [];
    }
    return [];
  }
}

  

 
  


  

