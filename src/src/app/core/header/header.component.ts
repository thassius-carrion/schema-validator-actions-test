import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  readonly VERSION = environment.version

  readonly PROGRAMMERS_LOGO_PATH: string = "assets/images/logo/programmers-colorido.png";
  readonly OPEN_DELIVERY_LOGO_PATH: string = "assets/images/logo/open-delivery.webp";

  readonly OPEN_DELIVERY_DOC_URL: string = "https://abrasel-nacional.github.io/docs/";

  readonly TITLE: string = "Open Delivery -";
  readonly TITLE_COMPLEMENT: string = "API Schema Validator ";
}
