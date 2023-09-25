import { AfterViewInit, Component, ElementRef, HostListener, ViewChild } from '@angular/core';

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.scss']
})
export class FilterBarComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    console.log('sortSelectButton:', this.sortSelectButton);
    console.log('sortSelectOptions:', this.sortSelectOptions);
  }
  selectedOptionTL: string = '';
  selectedOptionTime: string = '';

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
  //
  @ViewChild('priceButton')
  priceButton!: ElementRef;
  @ViewChild('priceBar')
  priceBar!: ElementRef;
  priceValue: string = '';
  priceValueMin: string = '';
  priceValueMax: string = '';
  invalidPrice: boolean = false;
  isShowPriceBar: boolean = false;

  togglePrice() {
    this.isShowPriceBar = !this.isShowPriceBar;
  }
  clearPrice() {
    this.priceValue = '';
  }

  applyPrice() {
    if (this.priceValueMax && this.priceValueMin) {
      this.priceValue = this.priceValueMin + " - " + this.priceValueMax;
      this.invalidPrice = false;
    } else {
      this.invalidPrice = true;
    }
  }

  restrictToNumbers(event: any) {
    const inputChar = String.fromCharCode(event.keyCode);

    // Sử dụng biểu thức chính quy để kiểm tra xem ký tự có phải là số không
    if (!/^[0-9]+$/.test(inputChar)) {
      event.preventDefault(); // Chặn ký tự không phải số
    }
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

    if (
      !this.priceButton.nativeElement.contains(event.target as Node) &&
      !this.priceBar.nativeElement.contains(event.target as Node)
    ) {
      this.isShowPriceBar = false;
    }
  }

}
