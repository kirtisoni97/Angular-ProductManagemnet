import { Component, EventEmitter, Output } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ServiceService } from '../service.service';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
@Component({
  selector: 'app-navbar',
  imports: [ CommonModule,FormsModule  ,MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatBadgeModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  searchText = '';
  selectedCategory = '';
cartCount=0
  
 showFooter = true;
  constructor(private productService: ServiceService,private route:Router) {
        this.route.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
     
        this.showFooter = !event.urlAfterRedirects.includes('/cart');
      });
  }

gotoList(){
  this.route.navigate(['/'])
}

  ngOnInit(){
    this.productService.$ProductList.subscribe(res=>{
this.cartCount=res.length
    })
  }
  onSearch() {
    this.productService.setSearch(this.searchText);
  }

  onCategoryChange() {
    this.productService.setCategory(this.selectedCategory);
  }

  goToCart(){
this.route.navigate(['/cart'])
  }

}
