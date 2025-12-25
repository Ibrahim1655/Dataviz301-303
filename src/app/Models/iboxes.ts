export interface Aliment{
    name: string;
    quantity: number;
}

export interface Box {
  id: number;
  name: string;
  pieces: number;
  price: number;
  image: string;
  foods: Aliment[];
  flavors: string[];
  quantity?: number;// pour la quantité de l'article dans le panier
}