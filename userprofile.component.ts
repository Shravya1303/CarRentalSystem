import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserProfileComponent implements OnInit {
  user: any;

  ngOnInit() {
    const userData = localStorage.getItem('loggedInUser');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      this.user = {
        ...parsedUser,
        membership: 'Standard',
        registrationDate: '2025-01-01',
        address: 'Hyderabad, India'
      };
    }
  }
}