
import { Component, NgModule, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { Brand } from 'src/app/Models/brand';
import { Category } from 'src/app/Models/category';
import { Model } from 'src/app/Models/model';
import { ProducVM } from 'src/app/Models/produc-vm';
import { Product } from 'src/app/Models/product';
import { SubCategory } from 'src/app/Models/sub-category';
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

  constructor(private _router:Router, private fb:FormBuilder,private productservice:ProductService,private categoryService:CategoryService,private subcategoryservice:SubcategoryService,private modelservice:ModelService,private brandService:BrandService) { }

  ngOnInit(): void {
    this.returnAllProducts();
    this.returnAllBrands();
    this.returnallcategory();
  }
  returnAllProducts()
  {
    this.productservice.getAllProducts().subscribe((data)=>{
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
          alert("Succeeded");
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
    .pipe(first())
    .subscribe(
        data => {
          alert("Succeeded");
          this.AllBrand=data;
          //  this._router.navigate([this._router.url]);
        },
        error => {
            this.errorMsg = error;
          //  this.loading = false;
        });
  
}
}