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

  // Récupérer l'ID de l'utilisateur connecté depuis le localStorage
  private userId: number = 0;
  private currentUser: any = null;

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
    // Récupérer l'utilisateur connecté depuis le localStorage
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      this.currentUser = JSON.parse(savedUser);
      this.userId = this.currentUser.id;
      this.loadProfile();
    } else {
      this.errorMessage = 'Vous devez être connecté pour voir votre profil.';
    }
  }

  loadProfile(): void {
    if (!this.userId) {
      this.errorMessage = 'Utilisateur non trouvé.';
      return;
    }

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

