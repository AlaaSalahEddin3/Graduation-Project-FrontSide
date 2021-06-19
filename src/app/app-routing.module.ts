import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBrandComponent } from './Components/dashboard/Brand/add-brand/add-brand.component';
import { AddCategoryComponent } from './Components/dashboard/Categorys/add-category/add-category.component';
//import { CategoriesComponent } from './Components/dashboard/categories/categories.component';
import { IndexComponent } from './Components/dashboard/Categorys/index/index.component';
import { DashboardComponent } from './Components/dashboard/dashboard/dashboard.component';
import { ModelComponent } from './Components/dashboard/Model/model/model.component';
import { OrderComponent } from './Components/dashboard/order/order.component';
import { AddProduComponent } from './Components/dashboard/Products/add-produ/add-produ.component';
import { SubCategoriesComponent } from './Components/dashboard/sub-categories/sub-categories.component';
//import { AddSubCategoryComponent } from './Components/dashboard/SubCategory/add-sub-category/add-sub-category.component';
//import { ProductComponent } from './Components/dashboard/product/product.component';
//import { SubCategoryComponent } from './Components/dashboard/sub-category/sub-category.component';
//import { ShowComponent } from './Components/dashboard/SubCategory/show/show.component';
import { UsersComponent } from './Components/dashboard/users/users.component';

const routes: Routes = [

  {path: 'categories', component: IndexComponent},
  {path: 'orders', component:OrderComponent},
  {path: 'products', component:AddProduComponent},
  {path: 'users', component: UsersComponent},
  {path:"AddCategory",component:AddCategoryComponent},
{path:'subCategories',component:SubCategoriesComponent},
{path:'brans',component:AddBrandComponent},
{path:'models',component:ModelComponent},
{path:'subcategories',component:SubCategoriesComponent},
{path:'dashboard',component:DashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
