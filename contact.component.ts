import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CarserviceService } from '../../carservice.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  userName: string = '';
  feedbackMessage: string = '';

  constructor(private carService: CarserviceService) {}

  submitFeedback() {
    if (this.userName.trim() && this.feedbackMessage.trim()) {
      const feedback = {
        name: this.userName,
        message: this.feedbackMessage
      };

      this.carService.addFeedback(feedback).subscribe(() => {
        alert('Thank you for your feedback!');
        this.userName = '';
        this.feedbackMessage = '';
      });
    } else {
      alert('Please fill in both fields');
    }
  }
}
