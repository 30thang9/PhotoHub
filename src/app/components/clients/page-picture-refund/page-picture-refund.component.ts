import { Component } from '@angular/core';

@Component({
  selector: 'app-page-picture-refund',
  templateUrl: './page-picture-refund.component.html',
  styleUrls: ['./page-picture-refund.component.scss']
})
export class PagePictureRefundComponent {
  isShowAskRepair: boolean = false;
  isDropdownOpen: boolean = false;

  toggleAsk() {
    this.isShowAskRepair = !this.isShowAskRepair;
  }

  closeAsk() {
    this.isShowAskRepair = false;
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
}
