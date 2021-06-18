import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SubcategoryService } from 'src/app/Services/subcategory.service';
import { Isubcategory } from 'src/app/Shared_Interfaces/Isubcategory';

@Component({
  selector: 'app-add-sub-catogry',
  templateUrl: './add-sub-catogry.component.html',
  styleUrls: ['./add-sub-catogry.component.scss']
})
export class AddSubCatogryComponent implements OnInit {

  
  constructor(private fb:FormBuilder,private subcategoryService:SubcategoryService,private router :Router) { }
  subcategoryList:Isubcategory []=[];
  errorMsg: any;
  dataSaved=false;
  
  massage: any;
  id: number=0;
  addSubCategoryForm:any
  ngOnInit(): void {
    this.addSubCategoryForm=this.fb.group({
      name:['',[Validators.required]],
      description :['',[Validators.required]],
      categoryId :['',[Validators.required]],
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
addSubCategory(subcategory: Isubcategory) {  
  debugger;  
  subcategory.id= this.id;  
  this.subcategoryService.addCategory(subcategory).subscribe(  
   () => {  
    this.dataSaved = true;  
    this.massage = 'Record saved Successfully';  
    this.Reset();  
    this.id = 0; 
    this.getSubCategory();      
   });  
   this.router.navigate(['/SubCategorys/Show']);
 } 


}
