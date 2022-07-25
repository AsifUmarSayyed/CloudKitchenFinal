import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCategoryTableComponent } from './view-category-table.component';

describe('ViewCategoryTableComponent', () => {
  let component: ViewCategoryTableComponent;
  let fixture: ComponentFixture<ViewCategoryTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCategoryTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCategoryTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
