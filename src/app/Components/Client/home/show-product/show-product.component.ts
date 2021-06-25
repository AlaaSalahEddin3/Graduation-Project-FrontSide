
import { Component, NgModule, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { Brand } from 'src/app/Models/brand';
import { Category } from 'src/app/Models/category';
import { Model } from 'src/app/Models/model';
import { ProducVM } from 'src/app/Models/produc-vm';
import { Product } from 'src/app/Models/product';
import { SubCategory } from 'src/app/Models/sub-category';
import { User } from 'src/app/Models/user';
import { BrandService } from 'src/app/Services/brand.service';
import { CategoryService } from 'src/app/Services/category.service';
import { ModelService } from 'src/app/Services/model.service';
import { ProductService } from 'src/app/Services/product.service';
import { SubcategoryService } from 'src/app/Services/subcategory.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-show-product',
  templateUrl: './show-product.component.html',
  styleUrls: ['./show-product.component.scss']
})
export class ShowProductComponent implements OnInit {
  allProducts!:ProducVM[];
allCategories!:Category[];
errorMsg!:string;
allModel!:Model[];
prouctId!:number;
AllBrand! :Brand[];
isChecked!:any
  constructor(private route:ActivatedRoute,private _router:Router, private fb:FormBuilder,private productservice:ProductService,private categoryService:CategoryService,private subcategoryservice:SubcategoryService,private modelservice:ModelService,private brandService:BrandService) { }
SubCategoryId!:number
  ngOnInit(): void {
  
    this.returnAllBrands();
    this.returnallcategory();
    const routeParams = this.route.snapshot.paramMap;
    this.SubCategoryId = Number(routeParams.get('id'));
    this.returnAllProducts(this.SubCategoryId);
  }
  
  returnAllProducts(id:number)
  {
    this.productservice.getRelatedProducts(id).subscribe((data)=>{
      this.allProducts=data;

      console.log(this.allProducts);
    }
    ,(error)=>{
      alert(error)
    })

  }
 
  
  returnallcategory()
  {
   
    this.categoryService.returnAllCategory()
    .pipe(first())
    .subscribe(
        data => {
 //         alert("Succeeded");
          this.allCategories=data;
          //  this._router.navigate([this._router.url]);
        },
        error => {
            this.errorMsg = error;
          //  this.loading = false;
        });
  
}
  returnAllBrands()
  {

    this.brandService.returnAllBrans()
  
    .subscribe(
        data => {
          //alert("Succeeded");
          this.AllBrand=data;
          console.log(data);
          //  this._router.navigate([this._router.url]);
        },
        error => {
            this.errorMsg = error;
            alert(error)
          //  this.loading = false;
        });
  
}
public createImgPath = (serverPath: string) => {
  return `${environment.apiUrl}/${serverPath}`;
}
currentUser:User
userCart:ProducVM[]
numOfItems:number
checkIfItemAlreadyExists(id: number) {
  this.currentUser = JSON.parse(localStorage.getItem('current_user') || '{}')
  this.userCart = this.currentUser.products
  let founded = false
  this.userCart.forEach((element, index) => {
    if (element.id == id) {
      founded = true
    }

  });
  return founded
}
addToCart(id:number)
{
  
 

  if (localStorage.getItem('current_user')) {
 if(!this.checkIfItemAlreadyExists(id)){
    this.currentUser = JSON.parse(localStorage.getItem('current_user') || '{}')
    this.userCart = this.currentUser.products
    this.numOfItems = this.userCart.length
     
      this.productservice.getProductById(id).subscribe((data) => {
        console.log(data);
        this.userCart.push(data);
          console.log(this.userCart)

        localStorage.setItem('current_user', JSON.stringify(this.currentUser))
  
      //  this._router.navigate([currentUrl]);
       /*  this._router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this._router.navigate([currentUrl])} */
          //  window.location.reload();

        }, (error) => {
          alert(error);
        })
      
    }
    else {
      alert('this is already in your cart')
    } 
  this._router.navigate(['/cart']);
  }
  else
  {
    alert('')
  }
}
checkValue(event:any,id:any)
{
  if(event=='A')
  {
    this.isChecked=false
  }
  else
  {
    this.isChecked=true
  } 

 console.log(event + id)
}
getProductsWithPrice(from:any,to:any)
{
  this.allProducts.forEach((element, index) => {
    if (element.price <from &&element.price>to) {
      this.allProducts.splice(index, 1);
    }

  });
}
}