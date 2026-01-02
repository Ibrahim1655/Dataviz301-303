import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../Services/user.service';
import { User } from '../Models/iuser';

@Component({
  selector: 'app-compte',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './compte.html',
  styleUrl: './compte.css',
})
export class Compte implements OnInit {
  profileForm: FormGroup;
  isLoading: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';

  // Pour la démo, on utilise l'ID 1. En production, récupérer depuis un service d'authentification
  private userId: number = 1;

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.profileForm = this.fb.group({
      pseudo: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      nom: [''],
      prenom: [''],
      telephone: [''],
      adresse: ['']
    });
  }

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile(): void {
    this.isLoading = true;
    this.userService.getUserById(this.userId).subscribe({
      next: (user: User) => {
        this.profileForm.patchValue({
          pseudo: user.pseudo,
          email: user.email,
          nom: user.nom || '',
          prenom: user.prenom || '',
          telephone: user.telephone || '',
          adresse: user.adresse || ''
        });
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erreur lors du chargement du profil:', err);
        this.errorMessage = 'Impossible de charger le profil.';
        this.isLoading = false;
      }
    });
  }

  updateProfile(): void {
    if (this.profileForm.invalid) return;

    this.isLoading = true;
    this.successMessage = '';
    this.errorMessage = '';

    const updatedUser: User = {
      id: this.userId,
      ...this.profileForm.value
    };

    this.userService.updateUser(updatedUser).subscribe({
      next: () => {
        this.successMessage = 'Profil mis à jour avec succès !';
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erreur lors de la mise à jour:', err);
        this.errorMessage = 'Erreur lors de la mise à jour du profil.';
        this.isLoading = false;
      }
    });
  }
}

