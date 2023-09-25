import { Component, OnInit, ElementRef, HostListener, Input } from '@angular/core';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss']
})
export class DatePickerComponent implements OnInit {
  @Input() textDefault: string = 'DD-MM-YYYY';

  selectedDate: string = ''; // Biến lưu trữ ngày được chọn
  isCalendarVisible: boolean = false;
  currMonth!: number;
  currYear!: number;
  monthNames: string[] = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'];
  calendarDays: (number | null)[] = []; // Sử dụng number | null để có thể xác định ngày có giá trị 0

  isMonthListVisible = false;
  selectedDay: number | null = null;

  constructor(private el: ElementRef) { }

  ngOnInit(): void {
    const currentDate = new Date();
    this.currMonth = currentDate.getMonth();
    this.currYear = currentDate.getFullYear();
    this.generateCalendar(this.currMonth, this.currYear);
  }

  toggleCalendar(): void {
    this.isCalendarVisible = !this.isCalendarVisible;
    if (!this.isCalendarVisible) {
      this.isMonthListVisible = false;
    }
  }

  prevYear(): void {
    this.currYear--;
    this.generateCalendar(this.currMonth, this.currYear);
  }

  nextYear(): void {
    this.currYear++;
    this.generateCalendar(this.currMonth, this.currYear);
  }

  toggleMonthList(): void {
    this.isMonthListVisible = !this.isMonthListVisible;
  }

  selectMonth(month: number): void {
    this.isMonthListVisible = false;
    this.currMonth = month;
    this.generateCalendar(this.currMonth, this.currYear);
  }

  isLeapYear(year: number): boolean {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
  }

  getFebDays(year: number): number {
    return this.isLeapYear(year) ? 29 : 28;
  }

  generateCalendar(month: number, year: number): void {
    const daysOfMonth = [31, this.getFebDays(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    this.calendarDays = [];

    const firstDay = new Date(year, month, 1);

    for (let i = 0; i <= daysOfMonth[month] + firstDay.getDay() - 1; i++) {
      if (i >= firstDay.getDay()) {
        this.calendarDays.push(i - firstDay.getDay() + 1);
      } else {
        this.calendarDays.push(null); // Thêm null nếu ngày có giá trị 0
      }
    }
  }

  selectDate(day: number | null): void {
    if (day !== null) {
      this.selectedDay = day;
      const date = new Date(this.currYear, this.currMonth, day);
      this.selectedDate = date.toLocaleDateString(); // Gán ngày được chọn vào biến selectedDate
      this.isCalendarVisible = false; // Ẩn calendar sau khi chọn ngày
    }
  }

  isCurrentDate(day: number | null): boolean {
    if (day === null) {
      return false;
    }
    const currentDate = new Date();
    return (
      day === currentDate.getDate() &&
      this.currYear === currentDate.getFullYear() &&
      this.currMonth === currentDate.getMonth()
    );
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    if (!this.el.nativeElement.contains(event.target) && this.isCalendarVisible) {
      this.isCalendarVisible = false;
      this.isMonthListVisible = false;
    }
  }
}
