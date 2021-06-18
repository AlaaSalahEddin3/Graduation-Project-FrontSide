import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SubcategoryService } from 'src/app/Services/subcategory.service';
import { Isubcategory } from 'src/app/Shared_Interfaces/Isubcategory';

@Component({
  selector: 'app-update-sub-category',
  templateUrl: './update-sub-category.component.html',
  styleUrls: ['./update-sub-category.component.scss']
})
export class UpdateSubCategoryComponent implements OnInit {

  errorMsg: any;
  scaty:Isubcategory;

  constructor(private fb:FormBuilder,private subcategoryService:SubcategoryService, private route: ActivatedRoute ,private router: Router) {
   
   }

  updateSubCategoryForm=this.fb.group({
    id:[,[]],
    name:['',[Validators.required]]

  })
  get name()
  {

    return this.updateSubCategoryForm.get('name')
  }
  get id()
  {
    return this.updateSubCategoryForm.get('id')
  }

catId:number;
  ngOnInit(): void {
    
    this.route.queryParams.subscribe(params => {
 this.catId= this.route.snapshot.params['id'];;
     this.subcategoryService.getCategoryById(this.catId).subscribe(
      (res)=>
      {
        this.scaty=res;
     //   alert(this.caty.Name);
        this.updateSubCategoryForm.controls['SubCategoryName'].setValue(this.scaty.name);
      },
    
      (errorResponse)=>
      {
       this.errorMsg=errorResponse;
    //   alert("aaaaaaaaaaa");
   //    alert(this.catId)
       
      }
    );

  });
  }
 
  UpdateSubCategory() {
    
       this.scaty=Object.assign(this.scaty, this.updateSubCategoryForm.value);

    this.subcategoryService.updateCategory(this.route.snapshot.params.id,this.scaty).subscribe(
      (res)=>
      {
        this.router.navigate(['/SubCategory/Show']);
    
      },
    
      (errorResponse)=>
      {
       this.errorMsg=errorResponse;
       alert("falied")
      }
    );
}

}
