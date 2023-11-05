import { Component } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
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
