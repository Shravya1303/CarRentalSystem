import { Routes } from "@angular/router";
import { LogoutComponent } from "./logout/logout.component";
import { AvailableCarsComponent} from "./available-cars/available-cars.component";
import {BookingformComponent} from "./bookingform/bookingform.component";
import { PaymentComponent} from "./payment/payment.component";
import{UserProfileComponent} from "./userprofile/userprofile.component";
import{ PaymentpageComponent} from "./paymentpage/paymentpage.component";
import { ContactComponent } from "./contact/contact.component";
import { authGuard } from "../authguard.guard";

export const dashboardRoutes:Routes=[
    {path:'logout',component:LogoutComponent, canActivate:[authGuard]},
    {path:'avaliable',component:AvailableCarsComponent, canActivate:[authGuard]},
    {path:'payment',component:PaymentComponent, canActivate:[authGuard] },
    {path:'bookingform',
        loadComponent: () =>
            import('./bookingform/bookingform.component').then(m => m.BookingformComponent),
        canActivate:[authGuard]
     },
    {path:'paymentpage',
        loadComponent: () =>
            import('./paymentpage/paymentpage.component').then(m => m.PaymentpageComponent),
        canActivate:[authGuard]
    },

    {path:'',component:UserProfileComponent, canActivate:[authGuard] },
    {path:'userprofile',component:UserProfileComponent, canActivate:[authGuard] },
    {path: 'contact', component: ContactComponent, canActivate:[authGuard]}
    
];