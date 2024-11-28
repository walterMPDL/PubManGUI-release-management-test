import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportItemsComponent } from './export-items.component';

describe('ExportItemsComponent', () => {
  let component: ExportItemsComponent;
  let fixture: ComponentFixture<ExportItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExportItemsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExportItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
