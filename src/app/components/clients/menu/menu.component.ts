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
          key: 'ky-yeu',
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
          key: 'phu-kien',
          value: 'Phụ kiện'
        },
        {
          key: 'my-pham',
          value: 'Mỹ phẩm'
        },
        {
          key: 'thuc-pham',
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
