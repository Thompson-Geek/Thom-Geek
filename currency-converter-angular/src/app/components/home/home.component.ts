import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, } from '@angular/forms';
import { ActivatedRoute, NavigationEnd } from '@angular/router';
import { Router } from '@angular/router';

import { CurrencyService } from '../../services/currency.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  formValue: FormGroup
  
  isUsd = false
  isEur = false
  selected
  currencies : any

  eur_default = 1.1
  
  usd_value = 0
  eur_value = 0

  constructor(
    private route: ActivatedRoute,
    private currencyServ: CurrencyService,
    private router: Router,
  ) { 
    this.formValue = new FormGroup({
      value: new FormControl('', Validators.required)
    });

    this.currencyServ.getCurrency().subscribe((res: any) => {
      this.currencies = res.rates;
      
      
      this.usd_value = this.currencies.USD * this.eur_default
      this.eur_value = this.currencies.EUR * this.eur_default

    })
  }

  ngOnInit() {
  }

  hideUsd() {
    this.isUsd = false;
  }

  hideEur() {
    this.isEur = false;
  }

  getOption() {
    const selected = this.selected;
    switch(selected) {
      case "USD":
        this.isUsd = true;          
        break;
      case "EUR":
        this.isEur = true;          
        break;
    }
    this.selected = ""; 
  }

  onChangedValue(value) {
    
    this.usd_value = this.currencies.USD * value
    this.eur_value = this.currencies.EUR * value
  }
  

}
