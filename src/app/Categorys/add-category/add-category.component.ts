import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/Services/category.service';
import { Category } from 'src/app/Shared_Interfaces/category';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {

 
  constructor(private fb:FormBuilder,private categoryService:CategoryService,private router :Router) { }
  categoryList:Category []=[];
  errorMsg: any;
  dataSaved=false;
  
  massage: any;
  ID: number=0;
  addCategoryForm:any
  ngOnInit(): void {
    this.addCategoryForm=this.fb.group({
      Name:['',[Validators.required]],
      Description :['',[Validators.required]],
    })
   this.getCategory();
 
  }
  get Name()
  {
    return this.addCategoryForm.get('Name')
  }
  get Description(){

    return this.addCategoryForm.get('Description')
  }
  getCategory(){
    this.categoryService.returnAllCategory().subscribe((Data)=>{
      this.categoryList=Data;
    },(err)=>{
    this.errorMsg=err;
    })
  }
Reset() {  
  this.addCategoryForm.reset();  
 } 
addCategory(category: Category) {  
  debugger;  
  category.ID= this.ID;  
  this.categoryService.addCategory(category).subscribe(  
   () => {  
    this.dataSaved = true;  
    this.massage = 'Record saved Successfully';  
    this.Reset();  
    this.ID = 0; 
    this.getCategory();      
   });  
   this.router.navigate(['/Category/Index']);
 } 


}
