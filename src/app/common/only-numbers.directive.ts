import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appOnlyNumbers]'
})
export class OnlyNumbersDirective {

  constructor(private el: ElementRef) { }

  @HostListener('input', ['$event']) onInputChange(event: Event) {
    const initialValue = this.el.nativeElement.value;
    const newValue = initialValue.replace(/[^0-9]/g, ''); // Loại bỏ các ký tự không phải số

    if (initialValue !== newValue) {
      this.el.nativeElement.value = newValue;
      event.preventDefault(); // Ngăn người dùng nhập các ký tự không phải số
    }
  }
}
