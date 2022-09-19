import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCreateCategoryComponent } from './edit-create-category.component';

describe('EditCreateCategoryComponent', () => {
  let component: EditCreateCategoryComponent;
  let fixture: ComponentFixture<EditCreateCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCreateCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCreateCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
