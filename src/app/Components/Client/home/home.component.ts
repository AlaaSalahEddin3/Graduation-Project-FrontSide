import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/Models/category';
import { SubCategory } from 'src/app/Models/sub-category';
import { CategoryService } from 'src/app/Services/category.service';
import { SubcategoryService } from 'src/app/Services/subcategory.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
allCaregories!:Category[]
clonedCategories!:Category[]//this for categories that will be shown
clonedSubCategories!:SubCategory[]
allSubCategories!:SubCategory[]
numOfRows!:number
numOfSubsCategories!:number
fixed:boolean=true
subs:boolean=true
all!:boolean
//@HostListener('window:scroll', ['$event']) 
  constructor(private categoryService:CategoryService,private subcategoryservice:SubcategoryService,private route:Router) { }

  ngOnInit(): void {
    this.getAllCategory();
  //  console.log(window.pageYOffset)
    window.onscroll=()=>{
      if(window.pageYOffset>300)
      {
        this.fixed=false
      }
      else
      {
        this.fixed=true
      }
    }
 // alert(this.getCurrentOffsetTop(10));
  
  }
  
getAllCategory()
{
  this.categoryService.returnAllCategory().subscribe((data)=>{
    this.allCaregories=data;
    this.clonedCategories=this.allCaregories.splice(0,13);
  },(error)=>{alert(error)})

}
getNumberOfRows(numOfSubsCategories:any)
{
  //alert(numOfSubsCategories)
  this.numOfRows=Math.floor(numOfSubsCategories/4);

}
getCurrentOffsetTop(element: ElementRef) {
  const rect = element.nativeElement.getBoundingClientRect();
  return rect.top + window.pageYOffset - document.documentElement.clientTop;
}
getSubs(id:number)
{
  
this.route.navigate(['/Getsubcategories/'+id]);
 /* this.subs=true;
   this.subcategoryservice.returnRlatedSubCategory(id).subscribe((data)=>{
     this.allSubCategories=data
    
     this.getNumberOfRows(this.allSubCategories.length);
 this.clonedSubCategories=this.allSubCategories.splice(0,this.numOfRows*4)
 localStorage.setItem("subs","true");
   },(error)=>{
     alert(error);
   });
*/
}
public createImgPath = (serverPath: string) => {
  return `${environment.apiUrl}/${serverPath}`;
}
viewAllCategories()
{
  this.subs=false;
alert(this.subs)
this.route.navigate(['/allcategories']);
}
}
