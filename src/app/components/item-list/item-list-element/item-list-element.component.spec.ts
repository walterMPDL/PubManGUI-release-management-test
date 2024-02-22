import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemListElementComponent } from './item-list-element.component';

describe('ListItemNextComponent', () => {
  let component: ItemListElementComponent;
  let fixture: ComponentFixture<ItemListElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemListElementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemListElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
