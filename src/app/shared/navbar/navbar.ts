import { Component, OnInit } from '@angular/core';
import { LucideAngularModule, FileIcon } from 'lucide-angular';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../Services/user.service';
import { RecaptchaModule } from 'ng-recaptcha';


@Component({
  selector: 'app-navbar',
  imports: [LucideAngularModule, RouterLink, RouterLinkActive, CommonModule, FormsModule, RecaptchaModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit {

  iconUserUrl: string = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNlNWUxZTEiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1jaXJjbGUtdXNlci1yb3VuZC1pY29uIGx1Y2lkZS1jaXJjbGUtdXNlci1yb3VuZCI+PHBhdGggZD0iTTE4IDIwYTYgNiAwIDAgMC0xMiAwIi8+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMCIgcj0iNCIvPjxjaXJjbGUgY3g9IjEyIiBjeT0iMTIiIHI9IjEwIi8+PC9zdmc+"
  titleClasses: string = "font-['Protest_Revolution'] text-[#EC3C3C]   [text-shadow:2px_2px_4px_rgba(0,0,0,0.5)] cursor-pointer";

  showUserPopup: boolean = false;
  popupView: 'menu' | 'login' | 'register' = 'menu';

  // Menu mobile burger
  isMobileMenuOpen: boolean = false;

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
  }

  // Propriétés pour la visibilité des mots de passe
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;
  registerBirthDate: string = '';

  // Propriétés pour le formulaire d'inscription
  registerNom: string = '';
  registerPrenom: string = '';
  registerEmail: string = '';
  registerTelephone: string = '';
  registerPassword: string = '';
  registerConfirmPassword: string = '';
  registerCaptchaToken: string = '';

  // Clé de site reCAPTCHA (clé de test Google pour le développement)
  recaptchaSiteKey: string = '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI';

  // Messages de statut
  registerMessage: string = '';
  registerError: string = '';
  isRegistering: boolean = false;

  constructor(private userService: UserService) { }

  toggleUserPopup(): void {
    this.showUserPopup = !this.showUserPopup;
    if (this.showUserPopup) {
      this.popupView = 'menu';
    }
    // Reset messages when closing
    this.registerMessage = '';
    this.registerError = '';
  }

  showLogin(): void {
    this.popupView = 'login';
  }

  showRegister(): void {
    this.popupView = 'register';
  }

  backToMenu(): void {
    this.popupView = 'menu';
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  // Callback quand le captcha est résolu
  onCaptchaResolved(token: string | null): void {
    this.registerCaptchaToken = token || '';
  }

  onRegister(): void {

    this.registerMessage = '';
    this.registerError = '';


    if (!this.registerEmail || !this.registerPassword) {
      this.registerError = 'Email et mot de passe sont obligatoires.';
      return;
    }


    if (!this.registerCaptchaToken) {
      this.registerError = 'Veuillez valider le captcha.';
      return;
    }

    if (this.registerPassword !== this.registerConfirmPassword) {
      this.registerError = 'Les mots de passe ne correspondent pas.';
      return;
    }

    this.isRegistering = true;


    const pseudo = this.registerPrenom || this.registerEmail.split('@')[0];

    const userData = {
      pseudo: pseudo,
      email: this.registerEmail,
      password: this.registerPassword,
      nom: this.registerNom || null,
      prenom: this.registerPrenom || null,
      telephone: this.registerTelephone || null,
      adresse: null,
      dateNaissance: this.registerBirthDate || null
    };

    this.userService.register(userData).subscribe({
      next: (response) => {
        console.log('Inscription réussie', response);
        this.registerMessage = 'Compte créé avec succès ! Vous pouvez vous connecter.';
        this.isRegistering = false;

        this.resetRegisterForm();
        // Passer à la vue login après 2 secondes
        setTimeout(() => {
          this.popupView = 'login';
          this.registerMessage = '';
        }, 2000);
      },
      error: (err) => {
        console.error('Erreur inscription', err);
        this.registerError = 'Erreur lors de l\'inscription. Veuillez réessayer.';
        this.isRegistering = false;
      }
    });
  }

  resetRegisterForm(): void {
    this.registerNom = '';
    this.registerPrenom = '';
    this.registerEmail = '';
    this.registerTelephone = '';
    this.registerBirthDate = '';
    this.registerPassword = '';
    this.registerConfirmPassword = '';
  }

  // Propriétés pour le formulaire de connexion
  loginEmail: string = '';
  loginPassword: string = '';
  loginMessage: string = '';
  loginError: string = '';
  isLoggingIn: boolean = false;

  // Utilisateur connecté
  currentUser: any = null;
  isLoggedIn: boolean = false;


  ngOnInit(): void {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      this.currentUser = JSON.parse(savedUser);
      this.isLoggedIn = true;
    }
  }

  onLogin(): void {
    // Reset messages
    this.loginMessage = '';
    this.loginError = '';

    // Validation basique
    if (!this.loginEmail || !this.loginPassword) {
      this.loginError = 'Email et mot de passe sont obligatoires.';
      return;
    }

    this.isLoggingIn = true;

    const credentials = {
      email: this.loginEmail,
      password: this.loginPassword
    };

    this.userService.login(credentials).subscribe({
      next: (response) => {
        console.log('Réponse connexion:', response);

        // Gérer différents formats de réponse
        let user = null;
        let success = false;

        if (response.success === true) {

          user = response.user;
          success = true;
        } else if (response.id || response.email) {

          user = response;
          success = true;
        } else if (response.error) {

          this.loginError = response.error;
        } else if (response.message && !response.success) {

          this.loginError = response.message;
        }

        if (success && user) {
          // D'abord supprimer l'ancien utilisateur pour éviter les conflits
          localStorage.removeItem('currentUser');
          this.currentUser = user;
          this.isLoggedIn = true;
          // Sauvegarder le nouveau utilisateur dans le localStorage
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.loginMessage = 'Connexion réussie ! Bienvenue ' + (user?.pseudo || user?.email);
          // Fermer le popup après 1.5 secondes
          setTimeout(() => {
            this.showUserPopup = false;
            this.loginMessage = '';
            this.resetLoginForm();
          }, 1500);
        } else if (!this.loginError) {
          this.loginError = 'Identifiants incorrects.';
        }
        this.isLoggingIn = false;
      },
      error: (err) => {
        console.error('Erreur connexion', err);
        this.loginError = 'Erreur lors de la connexion. Veuillez réessayer.';
        this.isLoggingIn = false;
      }
    });
  }

  resetLoginForm(): void {
    this.loginEmail = '';
    this.loginPassword = '';
  }

  logout(): void {
    this.currentUser = null;
    this.isLoggedIn = false;
    // Supprimer du localStorage
    localStorage.removeItem('currentUser');
  }
}

