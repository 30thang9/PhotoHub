import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, HostListener, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-navbar-admin',
  templateUrl: './navbar-admin.component.html',
  styleUrls: ['./navbar-admin.component.scss']
})

export class NavbarAdminComponent {


  constructor(private eventService: EventService) { }
  @ViewChild('iconToggle')
  iconToggle!: ElementRef;
  @ViewChild('searchInput')
  searchInput!: ElementRef;
  @ViewChild('searchBarToggle')
  searchBarToggle!: ElementRef;
  @ViewChild('navSearch')
  navSearch!: ElementRef;
  isShowSearchBar = false;
  isMenuVisible = false;
  inputValue: string = '';
  toggleSuggest: boolean = false;

  showMenu() {
    this.isMenuVisible = true;
    this.eventService.emitEvent('showMenuFromNavbar', this.isMenuVisible);
  }

  toggleSearch() {
    this.isShowSearchBar = !this.isShowSearchBar;
    if (this.isShowSearchBar) {
      setTimeout(() => {
        this.searchInput.nativeElement.focus();
      });
    }
    this.inputValue = "";
    this.toggleSuggest = false;
    this.eventService.emitEvent('toggleSuggestSearch', this.toggleSuggest);
  }

  onInputChange(event: Event) {
    this.inputValue = (event.target as HTMLInputElement).value;
    if (this.inputValue.trim() !== '') {
      this.toggleSuggest = true;
    } else {
      this.toggleSuggest = false;
    }
    this.eventService.emitEvent('toggleSuggestSearch', this.toggleSuggest);
  }

  @HostListener('document:click', ['$event'])
  closeDropdown(event: Event): void {
    if (!this.searchBarToggle.nativeElement.contains(event.target) && !this.navSearch.nativeElement.contains(event.target)) {
      if (this.isShowSearchBar) {
        this.toggleSuggest = false;
        this.inputValue = "";
        this.isShowSearchBar = false;
        this.eventService.emitEvent('toggleSuggestSearch', this.toggleSuggest);
      }
    }
  }


  //
  isShowDrop: boolean = false;
  toggleDrop() {
    this.isShowDrop = !this.isShowDrop;
  }
}
