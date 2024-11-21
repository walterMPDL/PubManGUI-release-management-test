import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormControl, ReactiveFormsModule, Validators} from "@angular/forms";
import {ActivatedRoute, Params, Route, Router} from "@angular/router";

@Component({
  selector: 'pure-paginator',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss'
})
export class PaginatorComponent {


  @Input() totalNumberOfItems:number = 0
  @Output() paginatorChanged = new EventEmitter<PaginatorChangeEvent>();

  itemPerPageOptions = [
    { value: 25, label: '25' },
    { value: 50, label: '50' },
    { value: 100, label: '100' },
    { value: 250, label: '250' },
  ];


  //protected selectedItemsPerPage = 25;
  protected totalNumberOfPages = 1;
  protected currentPageNumber = 1;

  protected jumptoField = new FormControl<number>(this.currentPageNumber, [Validators.nullValidator, Validators.min(1)]);
  protected selectedItemsPerPageField = new FormControl(25);


  constructor(private router: Router, private route: ActivatedRoute) {
    this.readQueryParams()
  }


  ngOnChanges() {
    this.calculateValues();
    //this.updateQueryParams();
  }

  private updateQueryParams() {
    const queryParams: Params = {
      p: this.currentPageNumber,
      s: this.selectedItemsPerPageField.value
    };
    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams,
        queryParamsHandling: 'merge', // remove to replace all query params by provided
      }
    );
  }

  private readQueryParams() {
    const page = this.route.snapshot.queryParamMap.get('p');
    if(page) {
      this.currentPageNumber = Number(page);
      this.jumptoField.setValue(this.currentPageNumber)
    }
    const size = this.route.snapshot.queryParamMap.get('s');
    if(size) {
      this.selectedItemsPerPageField.setValue(Number(size))
    }
  }

  private calculateValues() {
    //const relocate = this.currentPageNumber * this.selectedItemsPerPage;
    //this.selectedItemsPerPage = Number.parseInt(event.target.value);
    this.totalNumberOfPages = this.totalNumberOfItems ? Math.ceil(this.totalNumberOfItems / this.selectedItemsPerPage) : 0;
    this.jumptoField.setValidators([Validators.nullValidator, Validators.min(1), Validators.max(this.totalNumberOfPages)]);
    /*
    if (relocate < this.selectedItemsPerPage || relocate > this.totalNumberOfPages) {
      this.currentPageNumber = 1;
    } else {
      this.currentPageNumber = Math.floor(relocate / this.selectedItemsPerPage);
    }

     */
  }

  private emitEvent() {
    this.updateQueryParams();
    this.paginatorChanged.emit(this.fromToValues())
  }

  public fromToValues(): PaginatorChangeEvent {
    const from = (this.currentPageNumber - 1) * this.selectedItemsPerPage;
    const size = this.selectedItemsPerPage;
    return {from: from, size: size};
  }

  public changePage(val: number) {
    this.currentPageNumber = val as number;
    this.jumptoField.setValue(val);
    this.emitEvent()
  }

  protected jumpToPage() {
    this.jumptoField.errors? alert("value must be between 1 and " + this.totalNumberOfPages) : this.changePage(this.jumptoField.value as number);
  }

  get isFirst(): boolean {
    return this.currentPageNumber === 1;
  }

  get isLast(): boolean {
    return this.currentPageNumber === this.totalNumberOfPages;
  }

  first() {
    this.changePage(1);
  }

  prev() {
    this.changePage(Math.max(1, this.currentPageNumber - 1));
  }

  next() {
    this.changePage(Math.min(this.totalNumberOfPages, this.currentPageNumber + 1));
  }

  last() {
    this.changePage(this.totalNumberOfPages);
  }

  protected itemPerPageChange(event: any) {
    //this.selectedItemsPerPage = Number.parseInt(event.target.value);
    this.calculateValues();
    this.changePage(1);
    //this.emitEvent();
  }

  get selectedItemsPerPage(){
    return this.selectedItemsPerPageField.value || 25;
  }

}

export interface PaginatorChangeEvent {
  from: number,
  size: number
}
