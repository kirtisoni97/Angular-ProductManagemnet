import { Routes } from '@angular/router';

export const routes: Routes = [

 
    {
        path:'',
        loadComponent:()=> import ('./list/list.component').then((c)=>c.ListComponent)
    },
       {path:'cart',
        loadComponent: ()=> import('./cart/cart.component').then((c)=>c.CartComponent)
    }

];
