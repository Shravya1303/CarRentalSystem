import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CarserviceService {
  private usersUrl = 'http://localhost:3000/users';
  private carsUrl = 'http://localhost:3000/cars';
  private feedbackUrl = 'http://localhost:3000/feedback';

  constructor(private http: HttpClient) {}

  addUser(user: any): Observable<any> {
    return this.http.post(this.usersUrl, user);
  }

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.usersUrl);
  }

  addPaymentDetails(payment: any): Observable<any> {
    return this.http.post(this.usersUrl, payment);
  }

  updateUser(id: string, updatedData: any): Observable<any> {
    return this.http.patch(`${this.usersUrl}/${id}`, updatedData);
  }

  addCar(car: any): Observable<any> {
    return this.http.post(this.carsUrl, car);
  }

  getCars(): Observable<any[]> {
    return this.http.get<any[]>(this.carsUrl);
  }
  // getCarById(id: number): Observable<any> {
  //   return this.http.get(`${this.carsUrl}/${id}`);
  // }

  deleteCar(id: number): Observable<any> {
    return this.http.delete(`${this.carsUrl}/${id}`);
  }

  addFeedback(feedback: any): Observable<any> {
    return this.http.post(this.feedbackUrl, feedback);
  }

  getFeedback(): Observable<any[]> {
    return this.http.get<any[]>(this.feedbackUrl);
  }

}