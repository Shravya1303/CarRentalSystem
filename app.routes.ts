import { RouterModule, Routes } from '@angular/router';
import { MasterComponent } from './master/master.component';
import { HomeComponent } from './home/home.component';
import { CarsComponent } from './cars/cars.component';
// import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { dashboardRoutes } from './dashboard/dashboard.routes';
import { NgModule } from '@angular/core';
import { authGuard } from './authguard.guard';

export const routes: Routes = [
    // Master layout wrapper
    {
      path: '',
      component: MasterComponent,
      children: [
        {
            path:'',component:HomeComponent
        },
        {
            path:'cars',component:CarsComponent
        },
        // {
        //     path:'contact',component:ContactComponent
        // },
        {
            path:'login',component:LoginComponent
        },
        {
            path:'register',component:RegisterComponent
        },
        {
            path:'aboutus',component:AboutusComponent
        },
      ]
    },
  
    // Dashboard layout wrapper (no MasterComponent)
    {
      path: 'dashboard',
      component: DashboardComponent,
      canActivate: [authGuard],
      children: [
        ...dashboardRoutes,
      ]
    },

    {
      path:'admin1',
      loadChildren: () => import('./admin1/admin1.module').then(m => m.Admin1Module),
      canActivate: [authGuard]
    }
  ];
  
  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })

  export class AppRoutingModule {}



   