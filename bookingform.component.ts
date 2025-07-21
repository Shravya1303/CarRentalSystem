import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './bookingform.component.html',
  styleUrls: ['./bookingform.component.css']
})
export class BookingformComponent {
  bookingForm: FormGroup;
  totalCost: number = 0;
  pricePerDay: number = 1000;
  dateError: string = '';
  selectedCar: any;
  minPickupDate: string;

  constructor(private fb: FormBuilder, private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras?.state as { pricePerDay?: number, carDetails?: any };

    const today = new Date();
    this.minPickupDate = today.toISOString().split('T')[0];

    this.pricePerDay = state?.pricePerDay ?? 0;
    this.selectedCar = state?.carDetails;

    this.bookingForm = this.fb.group({
      pickupDate: ['', Validators.required],
      dropoffDate: ['', Validators.required],
      pickupLocation: ['', Validators.required],
      dropoffLocation: ['', Validators.required],
      contactNumber: ['', [Validators.required, Validators.pattern('^[6-9][0-9]{9}$')]],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@gmail\\.com$')]],
      terms: [false, Validators.requiredTrue]
    });

    this.bookingForm.valueChanges.subscribe(() => {
      this.validateDates();
      this.updateCost();
    });
  }

  isFieldInvalid(field: string): boolean {
    const control = this.bookingForm.get(field);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  validateDates(): void {
    const pickup = new Date(this.bookingForm.value.pickupDate);
    const dropoff = new Date(this.bookingForm.value.dropoffDate);

    if (pickup && dropoff && dropoff <= pickup) {
      this.dateError = "Dropoff date must be after pickup date";
      this.bookingForm.get('dropoffDate')?.setErrors({ invalidDate: true });
    } else {
      this.dateError = '';
      const dropoffControl = this.bookingForm.get('dropoffDate');
      if (dropoffControl?.hasError('invalidDate')) {
        dropoffControl.setErrors(null);
      }
    }
  }

  updateCost(): void {
    const pickup = new Date(this.bookingForm.value.pickupDate);
    const dropoff = new Date(this.bookingForm.value.dropoffDate);
    if (pickup && dropoff && dropoff > pickup) {
      const timeDiff = dropoff.getTime() - pickup.getTime();
      const days = Math.ceil(timeDiff / (1000 * 3600 * 24));
      this.totalCost = days * this.pricePerDay;
    } else {
      this.totalCost = 0;
    }
  }

  onSubmit(): void {
    if (this.bookingForm.valid) {
      const bookingDetails = {
        ...this.bookingForm.value,
        totalCost: this.totalCost
      };

      let bookingsArray: any[] = [];

      try {
        const existingData = localStorage.getItem('bookingDetails');
        if (existingData) {
          bookingsArray = JSON.parse(existingData);
          if (!Array.isArray(bookingsArray)) {
            bookingsArray = [];
          }
        }
      } catch (error) {
        console.error('Error reading localStorage:', error);
        bookingsArray = [];
      }

      bookingsArray.push(bookingDetails);

      try {
        localStorage.setItem('bookingDetails', JSON.stringify(bookingsArray));
        console.log('Booking saved:', bookingDetails);

        // ✅ Now navigate to payment page
        this.router.navigate(['/dashboard/paymentpage']);
      } catch (error) {
        console.error('Error saving to localStorage:', error);
      }
    } else {
      console.log('Form is invalid');
    }
  }
}