import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCategoryComponent } from './Categorys/add-category/add-category.component';
import { IndexComponent } from './Categorys/index/index.component';
import { UbdateCategoryComponent } from './Categorys/ubdate-category/ubdate-category.component';
import { AddSubCatogryComponent } from './SubCategory/add-sub-catogry/add-sub-catogry.component';
import { ShowComponent } from './SubCategory/show/show.component';
import { UpdateSubCategoryComponent } from './SubCategory/update-sub-category/update-sub-category.component';

const routes: Routes = [

  {path:'Categorys',component:IndexComponent},
  {path:'CategorysUPdate/:id',component: UbdateCategoryComponent },
  {path:'AddCategory',component:AddCategoryComponent},

  {path:'SubCategorys',component:ShowComponent},
  {path:'SubCategorysUPdate/:id',component: UpdateSubCategoryComponent },
  {path:'SubAddCategory',component:AddSubCatogryComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
