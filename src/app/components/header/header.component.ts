import { Component, Input } from '@angular/core';
import { Currency } from '../../models/Currency';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() exchangeUSD: Currency | undefined
  @Input() exchangeEUR: Currency | undefined

}
