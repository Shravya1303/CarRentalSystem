import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-payment-success',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  bookings: any[] = [];

  ngOnInit(): void {
    const bookingData = localStorage.getItem('bookingDetails');
    if (bookingData) {
      try {
        const parsedData = JSON.parse(bookingData);
        if (Array.isArray(parsedData)) {
          this.bookings = parsedData;
        } else {
          console.warn('Expected array, got:', parsedData);
        }
      } catch (error) {
        console.error('Failed to parse booking data:', error);
      }
    }
  }

  backToHome(): void {
    console.log('Navigating to home...');
  }
}