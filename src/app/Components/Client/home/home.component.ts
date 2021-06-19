import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/Models/category';
import { CategoryService } from 'src/app/Services/category.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
allCaregories!:Category[]
clonedCategories!:Category[]
  constructor(private categoryService:CategoryService) { }

  ngOnInit(): void {
   this.getAllCategory();
  }
getAllCategory()
{
  this.categoryService.returnAllCategory().subscribe((data)=>{
    this.allCaregories=data;
    this.clonedCategories=this.allCaregories.splice(0,12);
  },(error)=>{alert(error)})

}
}
