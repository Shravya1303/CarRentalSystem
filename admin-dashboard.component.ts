import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CarserviceService } from '../../carservice.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit{
  cars: any[] = [];

  constructor(private router: Router, private carService: CarserviceService) {}

  ngOnInit(): void {
    this.loadCars();
  }

  loadCars() {
    this.carService.getCars().subscribe({
      next: (data: any[]) =>this.cars = data,
      error: (err: any) => console.error('Error fetching cars: ',err)
    });
  }

  onAddCar() {
    this.router.navigate(['/admin1/admin-addcar']);
  }

  onLogout(){
    this.router.navigate(['/login']);
  }

  onDeleteCar(car: any){
    this.carService.deleteCar(car.id).subscribe({
      next: () => {
        this.cars = this.cars.filter(c => c.id !== car.id);
      },
      error: err => console.error('Error deleting car:', err)
    });
  }
}
