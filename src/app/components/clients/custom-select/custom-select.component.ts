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

  selectedOptionText: string = '';
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
  }

  selectOption(option: string) {
    this.selectedOption = option;

    this.selectedOptionText = this.options.find(o => o.value === this.selectedOption)?.textContent || '';
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
