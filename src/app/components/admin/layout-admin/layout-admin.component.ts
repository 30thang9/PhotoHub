import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { NavbarAdminComponent } from '../navbar-admin/navbar-admin.component';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-layout-admin',
  templateUrl: './layout-admin.component.html',
  styleUrls: ['./layout-admin.component.scss']
})
export class LayoutAdminComponent {
  @ViewChild(NavbarAdminComponent)
  private navbar: NavbarAdminComponent | undefined;
  @ViewChild('layoutMenu')
  layoutMenu!: ElementRef;
  isShowOverlay: boolean = false;
  isShowMenu: boolean = false;
  constructor(private eventService: EventService) { }
  ngOnInit(): void {
    this.eventService.registerEvent('toggleSuggestSearch').subscribe((toggleSuggest: boolean) => {
      this.isShowOverlay = toggleSuggest;
    });
    this.eventService.registerEvent('showMenuFromNavbar').subscribe((isMenuVisible: boolean) => {
      this.isShowMenu = isMenuVisible;
      this.isShowOverlay = isMenuVisible;
    });
    this.eventService.registerEvent('hideMenuFromIconClose').subscribe((isMenuHide: boolean) => {
      this.isShowMenu = isMenuHide;
      this.isShowOverlay = isMenuHide;
    });
  }


  @HostListener('document:click', ['$event'])
  closeDropdown(event: Event): void {
    const iconToggle = this.navbar?.iconToggle.nativeElement;
    if (!this.layoutMenu.nativeElement.contains(event.target) && !iconToggle.contains(event.target)) {
      if (this.isShowMenu) {
        this.isShowMenu = false;
        this.isShowOverlay = false;
      }
    }
  }
}
