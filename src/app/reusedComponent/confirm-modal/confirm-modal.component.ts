import { HttpClient } from '@angular/common/http';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent implements OnInit {

  @ViewChild('modalCloseBtn') modalCloseBtn:any;
  loading!:boolean;
  title!:string;
  message!:string;
  itemId!:any;  
  pageUrl!:string;
  pointerToFunction:any;
  constructor(private _router:Router, private _http:HttpClient) { }

  ngOnInit(): void {
  }
  confirm(){
    this.pointerToFunction(this.itemId)
    .pipe(first())
        .subscribe(
            () => {
              this._router.routeReuseStrategy.shouldReuseRoute = () => false;
              this._router.onSameUrlNavigation = 'reload';
              this.modalCloseBtn.nativeElement.click();
              this._router.navigate([this.pageUrl]);
            },
            () => {
                //this.errorMsg = error;
                this.loading = false;
            });
  }
}
