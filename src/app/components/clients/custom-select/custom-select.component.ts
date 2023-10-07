import { Component, Input, Output, EventEmitter, OnInit, AfterViewInit, ViewChild, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-custom-select',
  templateUrl: './custom-select.component.html',
  styleUrls: ['./custom-select.component.scss']
})
export class CustomSelectComponent implements OnInit, AfterViewInit {

  @Input() textDefault: string = '-- Choose --';
  @ViewChild('selectElement')
  selectElement!: ElementRef;
  @ViewChild('selectButton')
  selectButton!: ElementRef;
  @ViewChild('selectOptions')
  selectOptions!: ElementRef;

  @Input() selectedOption: string = '';
  @Output() selectedOptionChange = new EventEmitter<string>();

  options: { value: string, textContent: string }[] = [];

  isDropdownOpen: boolean = false;

  ngOnInit() {
    // Initialization logic (if any)
  }

  ngAfterViewInit() {
    // After the view has been initialized, get options from the select element
    const select = this.selectElement.nativeElement;
    for (let i = 0; i < select.options.length; i++) {
      const option = select.options[i];
      this.options.push({ value: option.value, textContent: option.textContent });
    }
  }
  dropdownPosition: { top: string, left: string } = { top: '0', left: '0' };

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;

    // // Nếu dropdown mở, tính toán vị trí
    // if (this.isDropdownOpen) {
    //   const selectButton = this.selectButton.nativeElement;
    //   const selectOptions = this.selectOptions.nativeElement;
    //   const rect = selectButton.getBoundingClientRect();
    //   const spaceBelow = window.innerHeight - rect.bottom;
    //   const spaceAbove = rect.top;

    //   // Tùy thuộc vào không gian trống, đặt vị trí cho dropdown
    //   if (spaceBelow >= selectOptions.clientHeight) {
    //     this.dropdownPosition.top = '100%';
    //     this.dropdownPosition.left = '0';
    //   } else if (spaceAbove >= selectOptions.clientHeight) {
    //     this.dropdownPosition.top = 'auto';
    //     this.dropdownPosition.left = '0';
    //   } else {
    //     this.dropdownPosition.top = 'auto';
    //     this.dropdownPosition.left = '100%';
    //   }
    // }
  }

  selectOption(option: string) {
    this.selectedOption = option;
    this.selectedOptionChange.emit(this.selectedOption);
    this.isDropdownOpen = false;
  }

  // Close dropdown when clicking outside
  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    if (
      !this.selectButton.nativeElement.contains(event.target as Node) &&
      !this.selectOptions.nativeElement.contains(event.target as Node)
    ) {
      this.isDropdownOpen = false;
    }
  }
}
