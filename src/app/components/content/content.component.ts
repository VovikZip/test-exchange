import { Component, Input } from '@angular/core';
import { Currency } from 'src/app/models/Currency';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})

export class ContentComponent {
  fromCurrency: string = 'UAH';
  toCurrency: string = 'USD';
  fromAmount: number = 0;
  toAmount: number = 0;

  @Input() exchangeUSD: Currency | undefined
  @Input() exchangeEUR: Currency | undefined

  exchangeRates!: Record<string, { buy: number; sell: number }>;

  constructor() {
    this.initExchangeRates();
  }

  private initExchangeRates(): void {
    this.exchangeRates = {
      UAH: { buy: 1, sell: 1 },
      USD: { buy: this.exchangeUSD?.rateBuy ?? 36.65, sell: this.exchangeUSD?.rateSell ?? 37.44 },
      EUR: { buy: this.exchangeEUR?.rateBuy ?? 39.90, sell: this.exchangeEUR?.rateSell ?? 41.10 },
    };
  }

  convertCurrency(): void {
    const fromRate = this.exchangeRates[this.fromCurrency].sell;
    const toRate = this.exchangeRates[this.toCurrency].buy;

    if (this.fromCurrency === this.toCurrency) {
      this.toAmount = this.fromAmount;
    } else {
      this.toAmount = (this.fromAmount * fromRate) / toRate;
    }

    this.toAmount = +this.toAmount.toFixed(2);
  }

  onFromAmountChange(): void {
    this.convertCurrency();
  }

  onToAmountChange(): void {
    const fromRate = this.exchangeRates[this.fromCurrency].sell;
    const toRate = this.exchangeRates[this.toCurrency].buy;

    this.fromAmount = (this.toAmount * toRate) / fromRate;
    this.fromAmount = +this.fromAmount.toFixed(2);
  }

  onFromCurrencyChange(): void {
    this.convertCurrency();
  }

  onToCurrencyChange(): void {
    this.convertCurrency();
  }

}
