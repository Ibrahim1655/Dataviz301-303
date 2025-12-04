import { Routes } from '@angular/router';
import { Landing } from './pages/landing/landing';
import { Component } from 'lucide-angular';
import { About } from './pages/about/about';
import { Menu } from './menu/menu';

export const routes: Routes = [
    {path:'', component:Landing},
    {path:'About', component:About},
    {path:'Menu', component:Menu}
    
];
