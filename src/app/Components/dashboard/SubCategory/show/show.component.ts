import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SubCategory } from 'src/app/Models/sub-category';
import { SubcategoryService } from 'src/app/Services/subcategory.service';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit {

  constructor(private fb: FormBuilder,private subcategoryService:SubcategoryService) { }
  SubcategoryList!:SubCategory [];
  
  errorMsg: any;
  dataSaved=false;
  massage!: string;
  id: number=0;
  addSubCategoryForm:any;

  ngOnInit(): void {
    this.addSubCategoryForm=this.fb.group({
      name:['',[Validators.required]],
      description:['',[Validators.required]]

    })
    
   this.getSubCategory();
 
  }
  getSubCategory(){
    this.subcategoryService.returnAllCategory().subscribe(
    (Data)=>{
      this.SubcategoryList=Data;
      console.log("hhhhhhhh");
     },
    (err)=>{
    this.errorMsg=err;
    })
  }

  deleteSubCategory(id:any){
    if (confirm("Are You Sure To Delete this Informations")) {  
  this.subcategoryService.deleteCategory(id)
  .subscribe(() => {
    console.log('Deleted'); 
     this.getSubCategory();
  }, (err) => {
    console.log(err);
  });

}  }

Reset() {  
  this.addSubCategoryForm.reset();  
 } 



}
