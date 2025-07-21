import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterModule, Router } from '@angular/router';
import { CarserviceService } from '../../carservice.service';

@Component({
  selector: 'app-available-cars',
  standalone: true,
  imports: [CommonModule,RouterLink,RouterModule],
  templateUrl: './available-cars.component.html',
  styleUrl: './available-cars.component.css'
})
export class AvailableCarsComponent implements OnInit{
  cars: any[] = [];

  constructor(private carService: CarserviceService, private router: Router) {}

  ngOnInit():void {
    this.carService.getCars().subscribe({
      next: (data) => {
        this.cars = data;
      },
      error: (err) => {
        console.error('Error fetching cars:',err);
      }
    });
  }

  goToBooking(car: any): void {
    this.router.navigate(['/dashboard/bookingform'], {
      state: { pricePerDay: car.pricePerDay, carDetails: car }
    });
  }
}
