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
}