import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-image-carousel',
  templateUrl: './image-carousel.component.html',
  styleUrls: ['./image-carousel.component.scss']
})
export class ImageCarouselComponent implements OnInit {
  @Input() images: string[] = [];
  currentSlide = 0;
  transform = 0;

  ngOnInit() { }

  prevSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.images.length) % this.images.length;
    this.transform += 300;
  }
  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.images.length;
    this.transform -= 300;
  }

}