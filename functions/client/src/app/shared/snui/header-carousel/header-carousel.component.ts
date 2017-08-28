import { Component, OnInit, Input } from '@angular/core';
import { ImageRef } from "../../../../../../universal/domain/imageRef";

@Component({
  selector: 'snui-header-carousel',
  templateUrl: './header-carousel.component.html'
})
export class HeaderCarouselComponent implements OnInit {
  @Input() images: ImageRef[];

  constructor() { }

  ngOnInit() {
  }

}
