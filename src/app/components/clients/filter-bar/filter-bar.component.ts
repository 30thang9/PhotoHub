import { AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.scss']
})
export class FilterBarComponent implements AfterViewInit {
  ngAfterViewInit(): void {
  }

  selectedDateY: string = '';
  selectedOptionTL: string = '';
  selectedOptionTime: string = '';
  selectedOptionPrice: string = '';

  @ViewChild('sortSelectButton')
  sortSelectButton!: ElementRef;
  @ViewChild('sortSelectOptions')
  sortSelectOptions!: ElementRef;
  isShowSortMenu: boolean = false;
  checkedSortText: string = '';
  checkedSortValue: number | null = null;

  toggleSort() {
    this.isShowSortMenu = !this.isShowSortMenu;
  }

  checked(param1: number | null, param2: string) {
    this.checkedSortValue = param1;
    this.checkedSortText = param2;
    this.isShowSortMenu = false;
  }


  //
  @ViewChild('addressButton')
  addressButton!: ElementRef;
  @ViewChild('addressBar')
  addressBar!: ElementRef;
  addressValue: string = '';
  isShowAddressBar: boolean = false;

  toggleAddress() {
    this.isShowAddressBar = !this.isShowAddressBar;
  }
  clearAddress() {
    this.addressValue = '';
  }

  resetFilter() {
    this.addressValue = '';
    this.isShowSortMenu = false;
    this.selectedOptionTL = '';
    this.selectedOptionTime = '';
    this.selectedDateY = '';
  }

  @HostListener('document:mousedown', ['$event'])
  onClickOutside(event: Event) {
    if (
      !this.sortSelectButton.nativeElement.contains(event.target as Node) &&
      !this.sortSelectOptions.nativeElement.contains(event.target as Node)
    ) {
      this.isShowSortMenu = false;
    }

    if (
      !this.addressButton.nativeElement.contains(event.target as Node) &&
      !this.addressBar.nativeElement.contains(event.target as Node)
    ) {
      this.isShowAddressBar = false;
    }

  }

}
