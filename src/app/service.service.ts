import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from './models/product.model';
import { BehaviorSubject, catchError, Subject, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http:HttpClient) { }

  apiURL='http://localhost:3000/products'

  GetData(){
    return  this.http.get<Product[]>(this.apiURL).pipe(catchError(this.handelerror))
  }

   AddData(item:Product){
  return this.http.post(this.apiURL,item)
   }
  cartItem:Product[]=[]
  private productCartlist= new BehaviorSubject<Product[]>([])
  $ProductList= this.productCartlist.asObservable()

  CartList(item:Product){
this.cartItem=[...this.productCartlist.value, item]
   this.productCartlist.next([...this.productCartlist.value, item]) 
   console.log
}
 private searchSubject = new BehaviorSubject<string>('');
  private categorySubject = new BehaviorSubject<string>('');

  search$ = this.searchSubject.asObservable();
  category$ = this.categorySubject.asObservable();

  setSearch(value: string) {
    this.searchSubject.next(value);
  }

  setCategory(value: string) {
    this.categorySubject.next(value);
  }
removecartItem(cartItem:Product){
 const items=this.cartItem.filter(item=> item !=cartItem)
 this.productCartlist.next(items)
 this.cartItem=items
}

handelerror(err:HttpErrorResponse){

   return throwError(()=>( err.message ) )
  }
}


