import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RecaptchaModule, RecaptchaFormsModule],
  templateUrl: './contact.html',
})
export class Contact {
  contactForm: FormGroup;

  // Clé de site reCAPTCHA v2 (remplacer par votre propre clé en production)
  // Pour les tests en local, utilisez cette clé de test Google
  siteKey: string = '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI';

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      nom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]],
      recaptcha: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.contactForm.invalid) return;
    console.log('Contact submission', this.contactForm.value);
    alert('Message envoyé — merci !');
    this.contactForm.reset();
  }

}
