import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProducVM } from 'src/app/Models/produc-vm';
import { User } from 'src/app/Models/user';
import { ProductService } from 'src/app/Services/product.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-cart',
  templateUrl: './user-cart.component.html',
  styleUrls: ['./user-cart.component.scss']
})
export class UserCartComponent implements OnInit {

  constructor(private route: ActivatedRoute, private productService: ProductService, private _router: Router) { }
  currentUser: any;
  userCart: ProducVM[]
  productTOadd: any
  numOfItems: number=0
  flag=false
  quantities = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
deleted=false
  ngOnInit(): void {
  
}
  ngAfterViewInit(){
  //  window.location.reload();
this.CalctotalPrice()

  }

  checkIfItemAlreadyExists(id: number) {
    let founded = false
    this.userCart.forEach((element, index) => {
      if (element.id == id) {
        founded = true
      }

    });
    return founded
  }
  getCart() {

    if (localStorage.getItem('current_user')) {
      // alert('founded')
      this.currentUser = JSON.parse(localStorage.getItem('current_user') || '{}')

      this.userCart = this.currentUser.products
     
      
      this.numOfItems = this.userCart.length
  
      }
      else {
        alert('not founded things')
      }
this.flag=true
   return this.userCart
    }
    
    


  public createImgPath = (serverPath: string) => {
    return `${environment.apiUrl}/${serverPath}`;
  }
  deleteFormCart(id: number) {
    this.userCart.forEach((element, index) => {
      if (element.id == id) {
        this.userCart.splice(index, 1);
        this.currentUser.products=this.userCart
        localStorage.setItem('current_user', JSON.stringify(this.currentUser))
         this.numOfItems=this.userCart.length
         window.location.reload();
      }

    });
  }



  totalprice: number=0
  CalctotalPrice() {
    this.userCart.forEach((element, index) => {
      this.totalprice += element.price;
return this.totalprice

    });
  }
  changeTotalPrice(qty: any, id: number) {
    alert(id);
    this.userCart.forEach((element, index) => {
      if (element.id == id) {
        this.totalprice += element.price * qty - element.price;
      }

    });
  }
 
}
