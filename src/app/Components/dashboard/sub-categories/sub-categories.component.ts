import { Component, OnInit, ViewChild } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { Category } from 'src/app/Models/category';
import { SubCategory } from 'src/app/Models/sub-category';
//import { ConfirmModalComponent } from 'src/app/reusedComponent/confirm-modal/confirm-modal.component';
import { SubcategoryService } from 'src/app/Services/subcategory.service';

@Component({
  selector: 'app-sub-categories',
  templateUrl: './sub-categories.component.html',
  styleUrls: ['./sub-categories.component.scss']
})
export class SubCategoriesComponent implements OnInit {

  @ViewChild('addOrUpdateModelCloseBtn') addOrUpdateModelCloseBtn:any;
 // @ViewChild(ConfirmModalComponent) confirmModal!:ConfirmModalComponent;
  hasCategories:boolean = false;
  private _categoryToUpdate!:SubCategory;
  allCategories!:SubCategory[]; 
  errorMsg!:string;
  categoryForm !: FormGroup;
  loading = false;
  submitted = false;
  actionName!:string;
  categoriesCount!:number;
  pageSize:number = 8;
  currentPageNumber:number = 1;
  numberOfPages!:number; // categoriesCount / pageSize
  public response!: {dbPath: ''};

  // convenience getter for easy access to form fields
  get formFields() { return this.categoryForm.controls; }
  constructor(private _categoryService:SubcategoryService,
    private _formBuilder: FormBuilder,
    private _router:Router,) { }

  ngOnInit(): void {
   // this.getCategoriesCount();
    this.categoryForm = this._formBuilder.group({
      name:['', Validators.required],
      description:['',Validators.required],
      category:['',Validators.required]
    });
  //  this.getSelectedPage(1);
  }

  /*rivate getCategoriesCount(){
    this._categoryService.getCategoriesCount().subscribe(
      data => {
        this.categoriesCount = data
        this.numberOfPages = Math.ceil(this.categoriesCount / this.pageSize)
        
      },
      error=>
      {
       this.errorMsg = error;
      }
    ) 
  }*/
  private onAddCategorySubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.categoryForm.invalid) {
        return;
      }

    this.loading = true;
    let newCategory:SubCategory = 
    {
      id:0 ,
      name : this.formFields.name.value,
      description: this.formFields.description.value,
      catogeryId:this.formFields.category.value
    };
    this._categoryService.addCategory(newCategory)
        .pipe(first())
        .subscribe(
            data => {
                this._router.routeReuseStrategy.shouldReuseRoute = () => false;
                this._router.onSameUrlNavigation = 'reload';
                this.addOrUpdateModelCloseBtn.nativeElement.click();
                this._router.navigate([this._router.url]);
            },
            error => {
                this.errorMsg = error;
                this.loading = false;
            });
  }

  private onUpdateCategorySubmit(){
    this.submitted = true;

    // stop here if form is invalid
    if (this.categoryForm.invalid) {
        return;
      }

    this.loading = true;
    this._categoryToUpdate.name = this.formFields.name.value;

    console.log(this._categoryToUpdate);
    this._categoryService.updateCategory(this._categoryToUpdate.id, this._categoryToUpdate)
        .pipe(first())
        .subscribe(
            data => {
                this._router.routeReuseStrategy.shouldReuseRoute = () => false;
                this._router.onSameUrlNavigation = 'reload';
                this.addOrUpdateModelCloseBtn.nativeElement.click();
                this._router.navigate([this._router.url]);
            },
            error => {
                this.errorMsg = error;
                this.loading = false;
            });
  }

  onAddOrUpdateSubmit(){
    if(this.actionName == "Add"){
      this.onAddCategorySubmit();
    }else{
      this.onUpdateCategorySubmit()
    }
  }
 
  openAddCategoryModal(){
    this.formFields.name.setValue("");
    this.actionName = "Add";
  }

  openUpdateCategoryModal(categoryId:any){
    this.actionName = "Update";
    this._categoryService.getCategoryById(categoryId)
        .pipe(first())
        .subscribe(
            data => {
                this.categoryForm.setValue({
                  name: data.name
                }); 
                this._categoryToUpdate = data;
            },
            error => {
                this.errorMsg = error;
                this.loading = false;
            });
  }
  openDeleteCategoryModal(categoryId:any){
    //this._categoryToDeleteId = categoryId;
  
    //this.confirmModal.entityName ="category";
  }

// pagination
  counter(i: number) {
    return new Array(i);
  }
  /*getSelectedPage(currentPageNumber:number){
    this._categoryService.getCategoriesByPage(this.pageSize,currentPageNumber).subscribe(
      data => {
        this.allCategories = data
        this.currentPageNumber = currentPageNumber;
        if(data.length != 0)
          this.hasCategories = true;
        else
          this.hasCategories = false;

      },
      error=>
      {
       this.errorMsg = error;
      }
    ) 
  }*/

}
