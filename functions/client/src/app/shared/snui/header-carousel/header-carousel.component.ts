import { Component, OnInit, Input } from '@angular/core';
import { ImageRef } from "../../../../../../shared/domain/imageRef";

@Component({
  selector: 'snui-header-carousel',
  templateUrl: './header-carousel.component.html',
  styleUrls: ['./header-carousel.component.css']
})
export class HeaderCarouselComponent implements OnInit {
  @Input() images: ImageRef[];

  constructor() { }

  ngOnInit() {
  }

}
