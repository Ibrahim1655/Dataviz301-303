import { Injectable, signal, computed, effect } from '@angular/core';
import { Box } from '../Models/iboxes';

export interface Order {
    id: number;
    items: Box[];
    total: number;
    date: Date;
    dayOfWeek: number; // 0 = Dimanche, 1 = Lundi, etc.
}

@Injectable({
    providedIn: 'root',
})
export class OrderService {
    private readonly STORAGE_KEY = 'orders_sushi_crousty';

    // Signal contenant toutes les commandes
    public orders = signal<Order[]>(this.getOrdersFromStorage());

    constructor() {
        // Sauvegarde automatique dans localStorage
        effect(() => {
            const data = JSON.stringify(this.orders());
            localStorage.setItem(this.STORAGE_KEY, data);
        });
    }

    // Ajouter une nouvelle commande
    addOrder(items: Box[], total: number): void {
        const now = new Date();
        const newOrder: Order = {
            id: Date.now(),
            items: items.map(item => ({ ...item })), // Copie des items
            total,
            date: now,
            dayOfWeek: now.getDay()
        };

        this.orders.update(list => [...list, newOrder]);
    }

    // Statistiques: Nombre de commandes par produit
    getMenuStats(): { labels: string[]; data: number[] } {
        const stats: { [key: string]: number } = {};

        this.orders().forEach(order => {
            order.items.forEach(item => {
                const name = item.name;
                stats[name] = (stats[name] || 0) + (item.quantity || 1);
            });
        });

        // Trier par nombre de commandes (décroissant) et prendre les 6 premiers
        const sorted = Object.entries(stats)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 6);

        return {
            labels: sorted.map(([name]) => name),
            data: sorted.map(([, count]) => count)
        };
    }

    // Statistiques: Commandes par jour de la semaine
    getOrdersByDay(): number[] {
        const days = [0, 0, 0, 0, 0, 0, 0]; // Lundi à Dimanche

        this.orders().forEach(order => {
            // Convertir: 0=Dim -> index 6, 1=Lun -> index 0, etc.
            const dayIndex = order.dayOfWeek === 0 ? 6 : order.dayOfWeek - 1;
            days[dayIndex]++;
        });

        return days;
    }

    // Statistiques: Répartition par catégorie (basée sur les saveurs)
    getCategoryStats(): { labels: string[]; data: number[] } {
        const categories: { [key: string]: number } = {
            'Sushis': 0,
            'Makis': 0,
            'Sashimis': 0,
            'Bowls': 0,
            'Autres': 0
        };

        this.orders().forEach(order => {
            order.items.forEach(item => {
                const name = item.name.toLowerCase();
                const qty = item.quantity || 1;

                if (name.includes('sushi')) {
                    categories['Sushis'] += qty;
                } else if (name.includes('maki') || name.includes('roll')) {
                    categories['Makis'] += qty;
                } else if (name.includes('sashimi')) {
                    categories['Sashimis'] += qty;
                } else if (name.includes('bowl') || name.includes('poke')) {
                    categories['Bowls'] += qty;
                } else {
                    categories['Autres'] += qty;
                }
            });
        });

        // Filtrer les catégories à 0
        const filtered = Object.entries(categories).filter(([, count]) => count > 0);

        return {
            labels: filtered.map(([name]) => name),
            data: filtered.map(([, count]) => count)
        };
    }

    // Nombre total de commandes
    getTotalOrders(): number {
        return this.orders().length;
    }

    // Revenu total
    getTotalRevenue(): number {
        return this.orders().reduce((acc, order) => acc + order.total, 0);
    }

    // Nombre total d'articles vendus
    getTotalItems(): number {
        return this.orders().reduce((acc, order) => {
            return acc + order.items.reduce((sum, item) => sum + (item.quantity || 1), 0);
        }, 0);
    }

    private getOrdersFromStorage(): Order[] {
        if (typeof localStorage !== 'undefined') {
            const data = localStorage.getItem(this.STORAGE_KEY);
            if (data) {
                const parsed = JSON.parse(data);
                // Reconvertir les dates string en objets Date
                return parsed.map((order: Order) => ({
                    ...order,
                    date: new Date(order.date)
                }));
            }
        }
        return [];
    }
}