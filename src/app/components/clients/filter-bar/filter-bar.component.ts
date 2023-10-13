import { AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.scss']
})
export class FilterBarComponent implements AfterViewInit {
  ngAfterViewInit(): void {
  }

  timeOptions: string[] = [
    '12:30 am',
    '1:00 am',
    '1:30 am',
    '2:00 am',
    '2:30 am',
    '3:00 am',
    '4:00 am',
    '4:30 am',
    '5:00 am',
    '5:30 am',
    '6:00 am',
    '6:30 am',
    '7:00 am',
    '7:30 am',
    '8:00 am',
    '8:30 am',
    '9:00 am',
    '9:30 am',
    '10:00 am',
    '10:30 am',
    '11:00 am',
    '11:30 am',
    '12:00 pm',
    '12:30 pm',
    '1:00 pm',
    '1:30 pm',
    '2:00 pm',
    '2:30 pm',
    '3:00 pm',
    '3:30 pm',
    '4:00 pm',
    '4:30 pm',
    '5:00 pm',
    '5:30 pm',
    '6:00 pm',
    '6:30 pm',
    '7:00 pm',
    '7:30 pm',
    '8:00 pm',
    '8:30 pm',
    '9:00 pm',
    '9:30 pm',
    '10:00 pm',
    '10:30 pm',
    '11:00 pm',
    '11:30 pm',
  ];


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
