import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import {MatIconModule} from '@angular/material/icon'
import { ServiceService } from './service.service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet,MatIconModule,NavbarComponent,FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-demo';
  count:number=0
 
constructor(private route:Router,private service:ServiceService){
  this.service.$ProductList.subscribe(res=> {
    this.count= res.length})
    
}


  openCart(){
 this.route.navigate(['/cart'])
  }





}
