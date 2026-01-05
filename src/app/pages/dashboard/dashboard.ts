import { Component, inject, OnInit, ViewChild, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, registerables } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { OrderService } from '../../Services/order.service';
import { UserService } from '../../Services/user.service';
import { User } from '../../Models/iuser';

// Register Chart.js components
Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Dashboard implements OnInit {
  @ViewChild('menuChart') menuChart?: BaseChartDirective;
  @ViewChild('ordersChart') ordersChart?: BaseChartDirective;
  @ViewChild('categoryChart') categoryChart?: BaseChartDirective;
  @ViewChild('ageChart') ageChart?: BaseChartDirective;

  private orderService = inject(OrderService);
  private userService = inject(UserService);
  private cdr = inject(ChangeDetectorRef);

  // Palette de couleurs orange/ambre pour correspondre à la charte graphique
  private orangePalette = [
    'rgba(230, 126, 34, 0.85)',   // Orange principal
    'rgba(211, 84, 0, 0.85)',     // Orange foncé
    'rgba(243, 156, 18, 0.85)',   // Jaune-orange
    'rgba(241, 196, 15, 0.85)',   // Jaune doré
    'rgba(255, 165, 89, 0.85)',   // Orange clair
    'rgba(186, 74, 0, 0.85)'      // Orange brun
  ];

  private orangeBorders = [
    'rgba(230, 126, 34, 1)',
    'rgba(211, 84, 0, 1)',
    'rgba(243, 156, 18, 1)',
    'rgba(241, 196, 15, 1)',
    'rgba(255, 165, 89, 1)',
    'rgba(186, 74, 0, 1)'
  ];

  // ========== MENUS LES PLUS COMMANDÉS (Bar Chart) ==========
  public menuLabels: string[] = [];
  public menuData: any = {
    labels: [],
    datasets: [{
      label: 'Commandes',
      data: [],
      backgroundColor: this.orangePalette,
      borderColor: this.orangeBorders,
      borderWidth: 2,
      borderRadius: 8
    }]
  };
  public menuOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 0 },
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: 'Produits les Plus Commandés',
        font: { size: 18, weight: 'bold' as const },
        color: '#ffffff'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: 'rgba(255,255,255,0.1)' },
        ticks: { color: 'rgba(255,255,255,0.7)' }
      },
      x: {
        grid: { display: false },
        ticks: { color: 'rgba(255,255,255,0.7)' }
      }
    }
  };

  // ========== TRANCHES D'ÂGE (Pie Chart) ==========
  public ageLabels: string[] = ['18-25 ans', '26-35 ans', '36-45 ans', '46-55 ans', '55+ ans'];
  public ageData: any = {
    labels: this.ageLabels,
    datasets: [{
      data: [28, 35, 22, 10, 5],
      backgroundColor: this.orangePalette,
      borderColor: '#1a1a1a',
      borderWidth: 3,
      hoverOffset: 15
    }]
  };
  public ageOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 0 },
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
          padding: 15,
          usePointStyle: true,
          font: { size: 12 },
          color: '#ffffff'
        }
      },
      title: {
        display: true,
        text: 'Répartition par Tranche d\'Âge',
        font: { size: 18, weight: 'bold' as const },
        color: '#ffffff'
      }
    }
  };

  // ========== COMMANDES PAR JOUR (Bar Chart) ==========
  public dayLabels: string[] = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
  public ordersData: any = {
    labels: this.dayLabels,
    datasets: [{
      label: 'Commandes',
      data: [0, 0, 0, 0, 0, 0, 0],
      backgroundColor: 'rgba(230, 126, 34, 0.7)',
      borderColor: 'rgba(230, 126, 34, 1)',
      borderWidth: 2,
      borderRadius: 8,
      hoverBackgroundColor: 'rgba(230, 126, 34, 0.9)'
    }]
  };
  public ordersOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 0 },
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: 'Commandes par Jour',
        font: { size: 18, weight: 'bold' as const },
        color: '#ffffff'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: 'rgba(255,255,255,0.1)' },
        ticks: { color: 'rgba(255,255,255,0.7)' }
      },
      x: {
        grid: { display: false },
        ticks: { color: 'rgba(255,255,255,0.7)' }
      }
    }
  };

  // ========== CATÉGORIES DE PLATS (Doughnut Chart) ==========
  public categoryLabels: string[] = [];
  public categoryData: any = {
    labels: [],
    datasets: [{
      data: [],
      backgroundColor: this.orangePalette,
      borderColor: '#1a1a1a',
      borderWidth: 3,
      hoverOffset: 10
    }]
  };
  public categoryOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 0 },
    cutout: '55%',
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
          padding: 15,
          usePointStyle: true,
          font: { size: 12 },
          color: '#ffffff'
        }
      },
      title: {
        display: true,
        text: 'Répartition par Catégorie',
        font: { size: 18, weight: 'bold' as const },
        color: '#ffffff'
      }
    }
  };

  // ========== STATS CARDS DATA ==========
  public stats = [
    { label: 'Commandes Total', value: '0', icon: '📦', trend: '', color: '#e67e22' },
    { label: 'Articles Vendus', value: '0', icon: '🍣', trend: '', color: '#d35400' },
    { label: 'Revenu Total', value: '0€', icon: '💰', trend: '', color: '#f39c12' },
    { label: 'Panier Moyen', value: '0€', icon: '🛒', trend: '', color: '#e67e22' }
  ];

  ngOnInit(): void {
    this.loadStats();
    this.loadAgeStats();
  }

  private loadStats(): void {
    // Récupérer les statistiques depuis le service
    const menuStats = this.orderService.getMenuStats();
    const ordersByDay = this.orderService.getOrdersByDay();
    const categoryStats = this.orderService.getCategoryStats();
    const totalOrders = this.orderService.getTotalOrders();
    const totalRevenue = this.orderService.getTotalRevenue();
    const totalItems = this.orderService.getTotalItems();
    const avgCart = totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0;

    // Mettre à jour les données des graphiques
    this.menuData = {
      ...this.menuData,
      labels: menuStats.labels.length > 0 ? menuStats.labels : ['Aucune commande'],
      datasets: [{
        ...this.menuData.datasets[0],
        data: menuStats.data.length > 0 ? menuStats.data : [0]
      }]
    };

    this.ordersData = {
      ...this.ordersData,
      datasets: [{
        ...this.ordersData.datasets[0],
        data: ordersByDay
      }]
    };

    this.categoryData = {
      ...this.categoryData,
      labels: categoryStats.labels.length > 0 ? categoryStats.labels : ['Aucune commande'],
      datasets: [{
        ...this.categoryData.datasets[0],
        data: categoryStats.data.length > 0 ? categoryStats.data : [0]
      }]
    };

    // Mettre à jour les stats cards
    this.stats = [
      { label: 'Commandes Total', value: totalOrders.toString(), icon: '📦', trend: '', color: '#e67e22' },
      { label: 'Articles Vendus', value: totalItems.toString(), icon: '🍣', trend: '', color: '#d35400' },
      { label: 'Revenu Total', value: `${totalRevenue.toFixed(2)}€`, icon: '💰', trend: '', color: '#f39c12' },
      { label: 'Panier Moyen', value: `${avgCart}€`, icon: '🛒', trend: '', color: '#e67e22' }
    ];

    this.cdr.detectChanges();
  }

  // Calculer l'âge à partir de la date de naissance
  private calculateAge(dateNaissance: string): number {
    const today = new Date();
    const birthDate = new Date(dateNaissance);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  // Charger les statistiques par tranche d'âge depuis les utilisateurs
  private loadAgeStats(): void {
    this.userService.getUsers().subscribe({
      next: (users: User[]) => {
        // Initialiser les compteurs par tranche d'âge
        const ageGroups = {
          '18-25 ans': 0,
          '26-35 ans': 0,
          '36-45 ans': 0,
          '46-55 ans': 0,
          '55+ ans': 0
        };

        // Compter les utilisateurs par tranche d'âge
        users.forEach(user => {
          if (user.dateNaissance) {
            const age = this.calculateAge(user.dateNaissance);

            if (age >= 18 && age <= 25) {
              ageGroups['18-25 ans']++;
            } else if (age >= 26 && age <= 35) {
              ageGroups['26-35 ans']++;
            } else if (age >= 36 && age <= 45) {
              ageGroups['36-45 ans']++;
            } else if (age >= 46 && age <= 55) {
              ageGroups['46-55 ans']++;
            } else if (age > 55) {
              ageGroups['55+ ans']++;
            }
          }
        });

        // Mettre à jour les données du graphique
        const data = Object.values(ageGroups);
        const hasData = data.some(v => v > 0);

        this.ageData = {
          labels: this.ageLabels,
          datasets: [{
            data: hasData ? data : [0, 0, 0, 0, 0],
            backgroundColor: this.orangePalette,
            borderColor: '#1a1a1a',
            borderWidth: 3,
            hoverOffset: 15
          }]
        };

        // Forcer la mise à jour du graphique
        if (this.ageChart && this.ageChart.chart) {
          this.ageChart.chart.update();
        }
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Erreur lors du chargement des utilisateurs:', err);
      }
    });
  }
}

