import { Component, NgModule, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Category } from 'src/app/Models/category';
import { Product } from 'src/app/Models/product';
import { CategoryService } from 'src/app/Services/category.service';
import { ProductService } from 'src/app/Services/product.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-produ',
  templateUrl: './add-produ.component.html',
  styleUrls: ['./add-produ.component.scss']
})
export class AddProduComponent implements OnInit {

 

allProducts:any;
allCategories!:Category;
errorMsg!:string;

productform=this.fb.group({
  name:['', [Validators.required,Validators.minLength(5)]],
  price:['', [Validators.required,Validators.min(1)]],
  description:['',[Validators.required,Validators.minLength(10)]],
  discount:['', [Validators.required,Validators.min(5)]],
  quantity:['', Validators.required],
 
})
public response = {dbPath: ''};
get formfields(){return this.productform.controls}
  ngOnInit(): void {
    this.categoryService.returnAllCategory()
    .pipe(first())
    .subscribe(
        data => {
          alert("Succeeded");
          this.allCategories=this.allCategories;
          //  this._router.navigate([this._router.url]);
        },
        error => {
            this.errorMsg = error;
          //  this.loading = false;
        });
  }
  constructor(private fb:FormBuilder,private productservice:ProductService,private categoryService:CategoryService) {}

 add()
{
  let newProduct:Product = {
    Id:0 , 
    Name: this.formfields.name.value,
    price: this.formfields.price.value,
    description: this.formfields.description.value,
    discount: this.formfields.discount.value,
    image : this.response.dbPath,
    quantity: this.formfields.quantity.value,
    Sub_Catogery_Id:4
  };
  this.productservice.addNewProduct(newProduct)
      .pipe(first())
      .subscribe(
          data => {
            alert("Succeeded");
            //  this._router.navigate([this._router.url]);
          },
          error => {
              this.errorMsg = error;
            //  this.loading = false;
          });
}
public uploadFinished = (event:any) => { 
  this.response = event;
}
public createImgPath = (serverPath: string) => {
  return `${environment.apiUrl}/${serverPath}`;
}
}
