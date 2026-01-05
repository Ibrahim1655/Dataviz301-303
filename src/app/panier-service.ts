import { computed, Injectable, signal, effect } from '@angular/core';
import { Box } from './Models/iboxes';

@Injectable({
  providedIn: 'root',
})
export class PanierService {
  private readonly STORAGE_KEY = 'panier_sushi_crousty';

  // Le signal contient la liste des articles
  public articles = signal<Box[]>(this.getPanierFromStorage());

  // Calcul du prix total (Prix x Quantité)
  total = computed(() => {
    return this.articles().reduce((acc, box) => {
      // On utilise (box.quantity || 1) pour éviter les bugs si quantity est undefined
      return acc + (box.price * (box.quantity || 1));
    }, 0);
  });

  // Calcul du nombre total d'articles (Somme des quantités)
  // Ex: 2 Makis + 1 California = 3 articles
  nombreArticle = computed(() => {
    return this.articles().reduce((acc, box) => acc + (box.quantity || 1), 0);
  });

  constructor() {
    effect(() => {
      const data = JSON.stringify(this.articles());
      localStorage.setItem(this.STORAGE_KEY, data);
      console.log('Sauvegarde auto effectuée !');
    });
  }



  // Ajoute un article OU augmente sa quantité s'il existe déjà
  ajouter(box: Box) {
    this.articles.update((listeActuelle) => {
      // On cherche si l'article est déjà dans le panier (par son ID)
      const existe = listeActuelle.find((b) => b.id === box.id);

      if (existe) {

        return listeActuelle.map((b) =>
          b.id === box.id
            ? { ...b, quantity: (b.quantity || 1) + 1 }
            : b
        );
      } else {

        return [...listeActuelle, { ...box, quantity: 1 }];
      }
    });
  }


  decrementer(box: Box) {
    this.articles.update((liste) => {
      const item = liste.find((b) => b.id === box.id);

      // Si la quantité est à 1 (ou moins) on le retire du panier
      if (!item || (item.quantity || 1) <= 1) {
        return liste.filter((b) => b.id !== box.id);
      }

      // Sinon on baisse la quantité de 1 et on retourne la liste modifiée
      return liste.map((b) =>
        b.id === box.id
          ? { ...b, quantity: (b.quantity || 1) - 1 }
          : b
      );
    });
  }


  incrementer(box: Box) {
    this.articles.update((liste) =>
      liste.map((b) =>
        // On trouve l'article et on augmente sa quantité de 1 et on retourne la liste modifiée
        b.id === box.id
          ? { ...b, quantity: (b.quantity || 1) + 1 }
          : b
      )
    );
  }

  // Supprime totalement la ligne (peu importe la quantité) et on retourne la liste modifiée
  retirer(box: Box) {
    this.articles.update((liste) => liste.filter((b) => b.id !== box.id));
  }

  vider() {
    this.articles.set([]);
  }

  private getPanierFromStorage(): Box[] {
    if (typeof localStorage !== 'undefined') {
      const data = localStorage.getItem(this.STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    }
    return [];
  }
}