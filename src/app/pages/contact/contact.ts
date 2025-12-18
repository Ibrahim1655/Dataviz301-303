import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.html',
})
export class Contact {
  contactForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      nom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]],
      recaptcha: [false, Validators.requiredTrue]
    });
  }

  onSubmit(): void {
    if (this.contactForm.invalid) return;
    console.log('Contact submission', this.contactForm.value);
    alert('Message envoyé — merci !');
    this.contactForm.reset();
  }

}
