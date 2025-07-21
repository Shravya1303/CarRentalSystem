import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CarserviceService } from '../../carservice.service';

@Component({
  selector: 'app-admin-addcar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin-addcar.component.html',
  styleUrl: './admin-addcar.component.css'
})
export class AdminAddcarComponent {
  carForm: FormGroup;
  imagePreview: string | ArrayBuffer | null = null;

  constructor(private fb: FormBuilder, private carService: CarserviceService, private router: Router) {
    this.carForm = this.fb.group({
      brand: ['', Validators.required],
      model: ['', Validators.required],
      year: ['', [Validators.required, Validators.pattern('^[0-9]{4}$')]],
      pricePerDay: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      fuelType: ['', Validators.required],
      seatingCapacity: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      mileage: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      color: ['', Validators.required],
      ac: ['', Validators.required],
      image: [null, Validators.required]
    });
  }

  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.carForm.patchValue({ image: file });
      this.carForm.get('image')?.updateValueAndValidity();

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (this.carForm.valid) {
      const car = {
        ...this.carForm.value,
        image: this.imagePreview
      };
      this.carService.addCar(car).subscribe({
        next: () => {
          console.log('Car added successfully');
          this.carForm.reset();
          this.imagePreview = null;
          this.router.navigate(['/admin1']);
        },
        error: err => console.error('Error adding car:', err)
      });
    } else {
      console.log('Form is invalidL:', this.carForm.errors, this.carForm.value);
    }
  }
}
