import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SubCategory } from 'src/app/Models/sub-category';
import { CategoryService } from 'src/app/Services/category.service';
import { SubcategoryService } from 'src/app/Services/subcategory.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-shop-sub-categories',
  templateUrl: './shop-sub-categories.component.html',
  styleUrls: ['./shop-sub-categories.component.scss']
})
export class ShopSubCategoriesComponent implements OnInit {

  constructor(private route:ActivatedRoute,private categoryService:CategoryService,private subcategoryservice:SubcategoryService) { }
id!:number
clonedSubCategories!:SubCategory[]
allSubCategories!:SubCategory[]
numOfRows!:number
numOfSubsCategories!:number
fixed:boolean=true
  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    this.id = Number(routeParams.get('id'));
    this.getSubs(this.id)
  }
  getNumberOfRows(numOfSubsCategories:any)
{
  //alert(numOfSubsCategories)
  this.numOfRows=Math.floor(numOfSubsCategories/4);

}
  getSubs(id:number)
  {
    
 
 
     this.subcategoryservice.returnRlatedSubCategory(id).subscribe((data)=>{
       this.allSubCategories=data
      alert(data.length);
       this.getNumberOfRows(this.allSubCategories.length);
   this.clonedSubCategories=this.allSubCategories.splice(0,this.numOfRows*4)
   console.log(this.clonedSubCategories)

     },(error)=>{
       alert(error);
     });

  }
  public createImgPath = (serverPath: string) => {
    return `${environment.apiUrl}/${serverPath}`;
  }
}
