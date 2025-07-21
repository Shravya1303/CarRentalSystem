import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminAddcarComponent } from './admin-addcar/admin-addcar.component';
import { Admin1RoutingModule } from './admin1-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    Admin1RoutingModule,
    AdminDashboardComponent,
    AdminAddcarComponent,
    HttpClientModule
  ]
})
export class Admin1Module { }
