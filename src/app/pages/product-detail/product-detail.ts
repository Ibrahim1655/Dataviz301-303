import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Sushi } from '../../Services/sushi';
import { Box } from '../../Models/iboxes';
import { PanierService } from '../../panier-service';

@Component({
    selector: 'app-product-detail',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './product-detail.html',
    styleUrl: './product-detail.css',
})
export class ProductDetail implements OnInit {
    private route = inject(ActivatedRoute);
    private sushiService = inject(Sushi);
    private panierService = inject(PanierService);

    box: Box | null = null;
    suggestions: Box[] = [];
    loading: boolean = true;

    // Images de sushi pour attribuer dynamiquement
    private sushiImages: string[] = [
        'amateur-mix.jpg',
        'california-dream.jpg',
        'fresh-mix.jpg',
        'gourmet-mix.jpg',
        'master-mix.jpg',
        'salmon-original.jpg',
        'sando-boxchicken.jpg',
        'sando-boxsaumon.jpg',
        'sunrise.jpg',
        'super-salmon.jpg',
    ];

    ngOnInit(): void {
        // Écouter les changements de paramètres de route
        this.route.paramMap.subscribe(params => {
            const id = Number(params.get('id'));
            this.loadProduct(id);
        });
    }

    private loadProduct(id: number): void {
        this.loading = true;
        this.box = null;
        this.suggestions = [];

        // Faire défiler vers le haut de la page
        window.scrollTo({ top: 0, behavior: 'smooth' });

        this.sushiService.getBoxes().subscribe((boxes) => {
            const foundBox = boxes.find(b => b.id === id);
            if (foundBox) {
                // Attribuer l'image correspondante
                const index = boxes.indexOf(foundBox);
                this.box = {
                    ...foundBox,
                    image: this.sushiImages[index % this.sushiImages.length]
                };

                // Récupérer les suggestions (4 autres boxes aléatoires)
                const otherBoxes = boxes
                    .filter(b => b.id !== id)
                    .map((b, i) => ({
                        ...b,
                        image: this.sushiImages[boxes.indexOf(b) % this.sushiImages.length]
                    }));

                // Mélanger et prendre 4 suggestions
                this.suggestions = this.shuffleArray(otherBoxes).slice(0, 4);
            }
            this.loading = false;
        });
    }

    // Mélanger un tableau aléatoirement
    private shuffleArray<T>(array: T[]): T[] {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    ajouter(): void {
        if (this.box) {
            this.panierService.ajouter(this.box);
            console.log(this.box.name + ' ajouté au panier');
        }
    }
}
