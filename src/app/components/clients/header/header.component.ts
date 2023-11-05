import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { User1Service } from 'src/app/services/demo/user1.service';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userId!: number;
  constructor(private eventService: EventService,
    private router: Router, private route: ActivatedRoute,
    private userService: User1Service) {
    this.route.url.subscribe(segments => {
      if (segments.length > 0) {
        const firstSegment = segments[0].path;
        if (firstSegment === 'partner') {
          this.route.params.subscribe(params => {
            const id = params['id'];
            if (id) {
              this.userId = parseInt(id, 10);
              this.loadUser(parseInt(id, 10));
            } else {
              console.error('ID not found in URL');
            }
          });
          this.loggedIn = true;
          console.log('This route has a "/partner/" prefix.');
        }
      }
    });
  }
  ngOnInit(): void {
    this.eventService.registerEvent('avatarEdited').subscribe(() => {
      this.loadUser(this.userId);
    });
  }

  async loadUser(id: number) {
    console.log(id);
    this.user = await this.userService.getUserById(id);
  }
  user: User | null = null;

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

  @HostListener('document:mousedown', ['$event'])
  closeDropdown(event: Event): void {
    if (!this.headerContentMobile.nativeElement.contains(event.target as Node) &&
      !this.iconToggle.nativeElement.contains(event.target as Node)) {
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


  loggedIn = false;  // Biến kiểm tra trạng thái đăng nhập
  showDropdown = false;  // Biến kiểm tra hiển thị dropdown menu

  // Phương thức để hiển thị hoặc ẩn dropdown menu
  toggleDropdownLo() {
    this.showDropdown = !this.showDropdown;
  }

  // Phương thức để đăng xuất người dùng
  logout() {
    // Thực hiện đăng xuất, ví dụ: xóa token hoặc thông tin người dùng từ local storage
    // Đồng thời, cập nhật biến loggedIn
    this.loggedIn = false;
  }
}
