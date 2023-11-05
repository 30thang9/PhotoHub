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
  menuDropdown0!: ElementRef;
  @ViewChild('menuDropdown1')
  menuDropdown1!: ElementRef;
  @ViewChild('itemDropdown')
  itemDropdown0!: ElementRef;
  @ViewChild('itemDropdown1')
  itemDropdown1!: ElementRef;
  isMenuVisible = false;
  isSearchMobileVisible = false;
  isDropdownVisible: boolean[] = [];
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

  toggleDropdown(i: number) {
    this.isDropdownVisible[i] = !this.isDropdownVisible[i];
    if (this.isDropdownVisible[i] == true) {
      for (let index = 0; index < this.isDropdownVisible.length; index++) {
        if (index !== i) {
          this.isDropdownVisible[index] = false;
        }
      }
    }
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

    // if (!this.menuDropdown0.nativeElement.contains(event.target) && !this.itemDropdown0.nativeElement.contains(event.target)) {
    //   if (this.isDropdownVisible) {
    //     this.isDropdownVisible = false;
    //   }
    // }
    // if (!this.menuDropdown1.nativeElement.contains(event.target) && !this.itemDropdown1.nativeElement.contains(event.target)) {
    //   if (this.isDropdown1Visible) {
    //     this.isDropdown1Visible = false;
    //   }
    // }

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


  urls = [
    {
      key: 'du-lich',
      value: 'Du lịch',
      children: [
        {
          key: 'chan-dung',
          value: 'Chân dung'
        },
        {
          key: 'the-thao',
          value: 'Thể thao'
        },
        {
          key: 'duong-pho',
          value: 'Đường phố'
        },
        {
          key: 'phong-canh',
          value: 'Phong cảnh'
        },
        {
          key: 'ky-yếu',
          value: 'Kỷ yếu'
        },
      ]
    },
    {
      key: 'lookbook',
      value: 'Lookbook',
      children: [
        {
          key: 'thoi-trang',
          value: 'Thời trang'
        },
        {
          key: 'thoi-trang',
          value: 'Phụ kiện'
        },
        {
          key: 'thoi-trang',
          value: 'Mỹ phẩm'
        },
        {
          key: 'thoi-trang',
          value: 'Thực phẩm'
        }
      ]
    },
    {
      key: 'catalogue',
      value: 'Catalogue'
    },
    {
      key: 'khac',
      value: 'Khác'
    },
  ];
}
