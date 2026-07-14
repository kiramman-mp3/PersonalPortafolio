import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContactService, ContactMessage } from '../../shared/services/contact.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  formData: ContactMessage = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  isSubmitting = false;
  successMessage = '';
  errorMessage = '';

  constructor(private contactService: ContactService) {}

  onSubmit(): void {
    if (!this.formData.name || !this.formData.email || !this.formData.message) {
      return;
    }

    this.isSubmitting = true;
    this.successMessage = '';
    this.errorMessage = '';

    this.contactService.sendMessage(this.formData).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.successMessage = '¡Mensaje enviado con éxito! Nos pondremos en contacto contigo a la brevedad.';
        // Reset form
        this.formData = {
          name: '',
          email: '',
          subject: '',
          message: ''
        };
      },
      error: (error) => {
        this.isSubmitting = false;
        console.error('Error sending message:', error);
        this.errorMessage = 'Ocurrió un error al enviar el mensaje. Por favor, inténtalo de nuevo más tarde.';
      }
    });
  }
}
