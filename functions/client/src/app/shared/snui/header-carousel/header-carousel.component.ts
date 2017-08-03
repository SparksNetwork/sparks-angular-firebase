import { Component, OnInit, Input } from '@angular/core';
import { IImage } from "../../../../../../shared/models/image.model";

@Component({
  selector: 'snui-header-carousel',
  templateUrl: './header-carousel.component.html',
  styleUrls: ['./header-carousel.component.css']
})
export class HeaderCarouselComponent implements OnInit {
  @Input() images: IImage[];

  constructor() { }

  ngOnInit() {
  }

}
