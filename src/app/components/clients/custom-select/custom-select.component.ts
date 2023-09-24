import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-custom-select',
  templateUrl: './custom-select.component.html',
  styleUrls: ['./custom-select.component.scss']
})
export class CustomSelectComponent {
  @Input() options: string[] = [];
  @Input() selectedOption: string = '';
  @Output() selectedOptionChange = new EventEmitter<string>();

  isDropdownOpen: boolean = false;

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  selectOption(option: string) {
    this.selectedOption = option;
    this.selectedOptionChange.emit(this.selectedOption);
    this.isDropdownOpen = false;
  }

  onSelectChange() {
    this.selectedOptionChange.emit(this.selectedOption);
  }
}
