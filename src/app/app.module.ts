import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Components/header/header.component';
import { FooterComponent } from './Components/footer/footer.component';

//import { CategoriesComponent } from './Components/dashboard/categories/categories.component';
//import { SubCategoryComponent } from './Components/dashboard/sub-category/sub-category.component';
//import { ProductComponent } from './Components/dashboard/product/product.component';
import { SideBarComponent } from './Components/dashboard/side-bar/side-bar.component';
import { UsersComponent } from './Components/dashboard/users/users.component';
import { DashboardComponent } from './Components/dashboard/dashboard/dashboard.component';
import { OrderComponent } from './Components/dashboard/order/order.component';
import { IndexComponent } from './Components/dashboard/Categorys/index/index.component';
import { AddCategoryComponent } from './Components/dashboard/Categorys/add-category/add-category.component';
import { UpdateCategoryComponent } from './Components/dashboard/Categorys/update-category/update-category.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
  //  CategoriesComponent,
 
    //ProductComponent,
    SideBarComponent,
    UsersComponent,
    OrderComponent,
    IndexComponent,
    AddCategoryComponent,
    UpdateCategoryComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
