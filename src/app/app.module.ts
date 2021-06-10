import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

import { AddCategoryComponent } from './Categorys/add-category/add-category.component';
import { UbdateCategoryComponent } from './Categorys/ubdate-category/ubdate-category.component';
import { IndexComponent } from './Categorys/index/index.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AddSubCatogryComponent } from './SubCategory/add-sub-catogry/add-sub-catogry.component';
import { UpdateSubCategoryComponent } from './SubCategory/update-sub-category/update-sub-category.component';
import { ShowComponent } from './SubCategory/show/show.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
   
    AddCategoryComponent,
    UbdateCategoryComponent,
    IndexComponent,
  
    AddSubCatogryComponent,
    UpdateSubCategoryComponent,
    ShowComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
