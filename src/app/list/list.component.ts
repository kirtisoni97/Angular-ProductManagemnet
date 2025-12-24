import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ServiceService } from '../service.service';
import { Product } from '../../app/models/product.model'
import {MatCardModule} from '@angular/material/card'
import { catchError, combineLatest, debounceTime, Subject } from 'rxjs';
import {MatButtonModule} from '@angular/material/button'
import { FooterComponent } from '../footer/footer.component';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-list',
  imports: [CommonModule,MatCardModule,MatButtonModule,MatIconModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {


constructor(private service:ServiceService){}
productList:Product[]=[]
dupproductList:Product[]=[]
 features = [
    {
      icon: 'local_shipping',
      title: 'Free Shipping',
      description: 'For invoices over $1500'
    },
    {
      icon: 'payments',
      title: 'Cash Back',
      description: 'When paying for products via Dasun Wallet'
    },
    {
      icon: 'support_agent',
      title: '24/7 Support',
      description: 'When something goes wrong'
    }
  ];
  categories = [

    { name: 'Technology', icon: 'memory', active: true },
    { name: 'Watch', icon: 'watch', active: false },
    { name: 'Glasses', icon: 'visibility', active: false },
    { name: 'Cosmetic', icon: 'face', active: false },
    { name: 'Food', icon: 'wine_bar', active: false }
  ];
   groupedProducts: Record<string, Product[]> = {};
ngOnInit(){

   this.loadProducts();
    this.applyFilters();

  }



// getProductlist(){
//   this.service.GetData().subscribe(
//   { next: (res)=>{
// this.productList=res
// this.dupproductList=res
//   },
//   error:(err)=>{
//     console.error(err)
//   }
// })
// }
  loadProducts() {
    this.service.GetData().subscribe(res => {
      this.productList = res;
      this.groupByCategory(res);
    });
  }
 applyFilters() {
    combineLatest([
      this.service.search$,
      this.service.category$
    ]).subscribe(([search, category]) => {

      const filtered = this.productList.filter(item => {
        const matchName = search
          ? item.name.toLowerCase().includes(search.toLowerCase())
          : true;

        const matchCategory = category
          ? item.category === category
          : true;

        return matchName && matchCategory;
      });

      this.groupByCategory(filtered);
    });
  }



  groupByCategory(list: Product[]) {
    this.groupedProducts = list.reduce(
      (acc: Record<string, Product[]>, product: Product) => {

        if (!acc[product.category]) {
          acc[product.category] = [];
        }

        acc[product.category].push(product);
        return acc;
      },
      {}
    );
  }

addProduct(item:Product){
  this.service.AddData(item).subscribe(()=>{

  })
  this.service.CartList(item)
}
 selectCategory(cat: any) {
  this.categories.forEach(c => c.active = false);
  cat.active = true;

  console.log('Selected category:', cat.name.toLowerCase()); // 🔍 debug
  this.service.setCategory(cat.name.toLowerCase());
}
getAllData(){
  this.loadProducts()
}

}
