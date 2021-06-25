import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { ProducVM } from 'src/app/Models/produc-vm';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { WishlistService } from 'src/app/Services/wish-list.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.scss']
})
export class WishListComponent implements OnInit {
  products!:ProducVM[];
  userID:any;
  deletedProd:any
  item:any;
  constructor(private _wishlistService: WishlistService,
    private _authenticationService: AuthenticationService,
   ) { }

  ngOnInit(): void {
     this.item=localStorage.getItem('wishListItem');
    this._wishlistService.getAll()
      .pipe(first())
      .subscribe(
        data => {
          this.products=data
        },
        error=>{

       });
  }
  deleteProductFromWishList(prodID: number) {
    this._wishlistService.deleteProductFromWishlist(prodID)
      .pipe(first())
      .subscribe(
        data => {
          //after delete from database delete from array to uptate wishlist view
           this.deletedProd = this.products.find(pc => pc.id == prodID);
          this.products.splice(this.products.indexOf(this.deletedProd), 1);
        },
        error => {

        });
  }
 /* addProductToCart(productId: number) {

    this._cartService.addProductToCart(productId).subscribe(
      data => {
        //after add product to cart remove it from wishlist
        this.deleteProductFromWishList(productId);
        alert("added to cart")
      },
      error => {
        alert(error);
      }
    )

  }*/

  public createImgPath = (serverPath: string) => {
    return `${environment.apiUrl}/${serverPath}`;
  }
}
