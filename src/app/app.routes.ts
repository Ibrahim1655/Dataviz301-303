import { Routes } from '@angular/router';
import { Landing } from './pages/landing/landing';
import { Component } from 'lucide-angular';
import { About } from './pages/about/about';
import { Menu } from './menu/menu';
import { Contact } from './pages/contact/contact';
import { Panier } from './panier/panier';
import { ProductDetail } from './pages/product-detail/product-detail';
import { Compte } from './compte/compte';

export const routes: Routes = [
    { path: '', component: Landing },
    { path: 'About', component: About },
    { path: 'Menu', component: Menu },
    { path: 'Contact', component: Contact },
    { path: 'Panier', component: Panier },
    { path: 'product/:id', component: ProductDetail },
    { path: 'Profil', component: Compte }

];

