import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSubCatogryComponent } from './add-sub-catogry.component';

describe('AddSubCatogryComponent', () => {
  let component: AddSubCatogryComponent;
  let fixture: ComponentFixture<AddSubCatogryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSubCatogryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSubCatogryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
