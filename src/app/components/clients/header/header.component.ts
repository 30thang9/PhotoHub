import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(private eventService: EventService) { }
  @ViewChild('iconToggle')
  iconToggle!: ElementRef;
  @ViewChild('headerContentMobile')
  headerContentMobile!: ElementRef;
  @ViewChild('inputSearchMobile')
  inputSearchMobile!: ElementRef;
  @ViewChild('menuDropdown')
  menuDropdown!: ElementRef;
  @ViewChild('menuDropdown1')
  menuDropdown1!: ElementRef;
  @ViewChild('itemDropdown')
  itemDropdown!: ElementRef;
  @ViewChild('itemDropdown1')
  itemDropdown1!: ElementRef;
  isMenuVisible = false;
  isSearchMobileVisible = false;
  isDropdownVisible = false;
  isDropdown1Visible = false;

  inputSearchMobileValue: string = '';
  inputSearchValue: string = '';
  toggleSuggestMobile = false;
  toggleSuggest = false;

  showMenu() {
    this.isMenuVisible = true;
  }
  hideMenu() {
    this.isMenuVisible = false;
  }

  showSearchMobile() {
    this.isSearchMobileVisible = true;
    if (this.isSearchMobileVisible) {
      setTimeout(() => {
        this.inputSearchMobile.nativeElement.focus();
      });
    }
  }

  hideSearchMobile() {
    this.isSearchMobileVisible = false;
    this.toggleSuggestMobile = false;
    this.inputSearchMobileValue = '';
  }

  toggleDropdown() {
    this.isDropdownVisible = !this.isDropdownVisible;
  }
  toggleDropdown1() {
    this.isDropdown1Visible = !this.isDropdown1Visible;
  }

  onChangeInputSearchMobile(event: Event) {
    this.inputSearchMobileValue = (event.target as HTMLInputElement).value;
    if (this.inputSearchMobileValue.trim() !== '') {
      this.toggleSuggestMobile = true;
    } else {
      this.toggleSuggestMobile = false;
    }
  }

  onChangeInputSearch(event: Event) {
    this.inputSearchValue = (event.target as HTMLInputElement).value;
    if (this.inputSearchValue.trim() !== '') {
      this.toggleSuggest = true;
    } else {
      this.toggleSuggest = false;
    }
  }

  @HostListener('document:click', ['$event'])
  closeDropdown(event: Event): void {
    if (!this.headerContentMobile.nativeElement.contains(event.target) &&
      !this.iconToggle.nativeElement.contains(event.target)) {
      if (this.isMenuVisible) {
        this.isMenuVisible = false;
      }
    }

    if (!this.menuDropdown.nativeElement.contains(event.target) && !this.itemDropdown.nativeElement.contains(event.target)) {
      if (this.isDropdownVisible) {
        this.isDropdownVisible = false;
      }
    }
    if (!this.menuDropdown1.nativeElement.contains(event.target) && !this.itemDropdown1.nativeElement.contains(event.target)) {
      if (this.isDropdown1Visible) {
        this.isDropdown1Visible = false;
      }
    }

  }
}
