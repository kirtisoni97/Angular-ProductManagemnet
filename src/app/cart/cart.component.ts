import { Component } from '@angular/core';
import { ServiceService } from '../service.service';
import { CommonModule } from '@angular/common';
import { Product } from '../../app/models/product.model'
import {MatCardModule} from '@angular/material/card'
@Component({
  selector: 'app-cart',
  imports: [CommonModule,MatCardModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  Cartlist:Product[]=[]
  constructor(private service:ServiceService){

    this.service.$ProductList.subscribe(list=>{
      console.log(list)
      this.Cartlist=list
    })
  }
remove(item:Product){
  this.service.removecartItem(item)
}
  
}
