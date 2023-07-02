import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { Currency } from './models/Currency';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'test-exchange';

  exchangeUSD: Currency | undefined
  exchangeEUR: Currency | undefined

  ngOnInit() {
    this.getExchangeRate()
  }

  getExchangeRate() {
    const apiUrl = 'https://api.monobank.ua/bank/currency'

    axios.get<Currency[]>(apiUrl)
      .then(response => {
        const currencyData: Currency[] = response.data;

        this.exchangeUSD = currencyData.find(currency => currency.currencyCodeA === 840 && currency.currencyCodeB === 980);
        this.exchangeEUR = currencyData.find(currency => currency.currencyCodeA === 978 && currency.currencyCodeB === 980);
      })
      .catch(error => {
        console.error('Помилка отримання курсу валют:', error);
      });
  }

}
