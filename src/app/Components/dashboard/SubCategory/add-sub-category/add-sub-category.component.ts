import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from 'src/app/Models/category';
import { SubCategory } from 'src/app/Models/sub-category';
import { SubcategoryService } from 'src/app/Services/subcategory.service';

@Component({
  selector: 'app-add-sub-category',
  templateUrl: './add-sub-category.component.html',
  styleUrls: ['./add-sub-category.component.scss']
})
export class AddSubCategoryComponent implements OnInit {


  constructor(private fb:FormBuilder,private subcategoryService:SubcategoryService,private router :Router,private categoryservice:SubcategoryService) { }
  subcategoryList:SubCategory []=[];
  errorMsg: any;
  dataSaved=false;
  categoryList!:Category[];
  massage: any;
  id: number=0;
  addSubCategoryForm:any
  ngOnInit(): void {
    this.addSubCategoryForm=this.fb.group({
      name:['',[Validators.required]],
      description :['',[Validators.required]],
      categoryId :['',[Validators.required]],
    })
    this.categoryservice.returnAllCategory().subscribe(
      (Data:any)=>{
        this.categoryList=Data;
        console.log(Data);
       },
      (err:any)=>{
      this.errorMsg=err;
      })

   this.getSubCategory();
 
  }
  get name()
  {
    return this.addSubCategoryForm.get('name')
  }

  get categoryId()
  {
    return this.addSubCategoryForm.get('categoryId')
  }
  get description(){

    return this.addSubCategoryForm.get('description')
  }
  getSubCategory(){
    this.subcategoryService.returnAllCategory().subscribe((Data)=>{
      this.subcategoryList=Data;
    },(err)=>{
    this.errorMsg=err;
    })
  }
Reset() {  
  this.addSubCategoryForm.reset();  
 } 
addSubCategory(subcategory: SubCategory) {  
  debugger;  
  subcategory.id= this.id;  
  console.log(subcategory);
  this.subcategoryService.addCategory(subcategory).subscribe(  
    () => {  
      this.dataSaved = true;  
      this.massage = 'Record saved Successfully';  
      this.Reset();  
      this.id = 0; 
      this.router.navigate(['/subCategories']);     
     });  
    
    }

}
