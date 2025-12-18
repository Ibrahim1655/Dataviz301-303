import { Component } from '@angular/core';
import { LucideAngularModule, FileIcon } from 'lucide-angular';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-navbar',
  imports: [LucideAngularModule, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {

  iconUserUrl: string = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNlNWUxZTEiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1jaXJjbGUtdXNlci1yb3VuZC1pY29uIGx1Y2lkZS1jaXJjbGUtdXNlci1yb3VuZCI+PHBhdGggZD0iTTE4IDIwYTYgNiAwIDAgMC0xMiAwIi8+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMCIgcj0iNCIvPjxjaXJjbGUgY3g9IjEyIiBjeT0iMTIiIHI9IjEwIi8+PC9zdmc+"
  titleClasses: string = "font-['Protest_Revolution'] text-[#EC3C3C]   [text-shadow:2px_2px_4px_rgba(0,0,0,0.5)] cursor-pointer";

  showUserPopup: boolean = false;
  popupView: 'menu' | 'login' | 'register' = 'menu';

  // Propriétés pour la visibilité des mots de passe
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;
  registerBirthDate: string = '';

  toggleUserPopup(): void {
    this.showUserPopup = !this.showUserPopup;
    if (this.showUserPopup) {
      this.popupView = 'menu';
    }
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
}



