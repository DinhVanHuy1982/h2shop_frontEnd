import { Component, OnDestroy, OnInit } from '@angular/core';
import {locale as vnLang} from './core/_config/i18n/vn';
import {locale as enLang} from './core/_config/i18n/en';
import { TranslationService } from './core/_base/layout/service/translation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{
  
  lang: string | undefined;
  ngOnInit(): void {
    console.log('da vaoooooooooooo-----------')

    sessionStorage.setItem('routingStack', JSON.stringify([]));
  }
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  constructor(
    private translationService: TranslationService,
  ){
    this.translationService.loadTranslations(enLang, vnLang);
  }

  title = 'h2shop_frontend';
}
