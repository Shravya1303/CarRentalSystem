import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CarserviceService } from '../carservice.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  feedbackList: any[] = [];
  
  constructor(private carService: CarserviceService) {}

  ngOnInit() {
    this.carService.getFeedback().subscribe(data => {
      this.feedbackList = data;
    });
  }
}