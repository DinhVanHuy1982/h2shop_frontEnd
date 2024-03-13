import { NgModule } from '@angular/core';
import { BrowserModule, createApplication } from '@angular/platform-browser';
import { AgGridModule } from 'ag-grid-angular';
import {MatButtonModule} from '@angular/material/button';
import {CdkScrollable} from '@angular/cdk/scrolling';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {TooltipPosition, MatTooltipModule} from '@angular/material/tooltip';
import {MatInputModule} from '@angular/material/input';
import { NgSelectModule } from '@ng-select/ng-select';
import { CommonModule } from '@angular/common';
import {MatDialog} from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import {MatTabsModule} from '@angular/material/tabs';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/compiler';
import { FormBuilder, FormControl, FormControlName, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSidenavModule} from '@angular/material/sidenav';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { HomePageComponent } from './home-page/home-page.component';
import { DetailComponent } from './detail/detail.component';
import { TooltipComponent } from '@angular/material/tooltip';

import {AsyncPipe} from '@angular/common';

import { ToastrService,ToastrModule } from 'ngx-toastr';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LanguageSelectorComponent } from './views/partials/layout/topbar/language-selector/language-selector.component';
import { MenuHorizontalComponent } from './menu/menu-horizontal/menu-horizontal.component';
import { AsideLeftComponent } from './menu/aside-left/aside-left.component';
import { LoginComponent } from './views/pages/auth/login/login.component';
import { BaseComponent } from './menu/base/base.component';


@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    DetailComponent,
    LanguageSelectorComponent,
    MenuHorizontalComponent,
    AsideLeftComponent,
    LoginComponent,
    BaseComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    AgGridModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTooltipModule,
    MatSlideToggleModule,
    CdkScrollable,
    MatInputModule,
    NgSelectModule,
    CommonModule,
    MatDialogModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    ToastrModule.forRoot({
      timeOut: 40000,
      positionClass: 'toast-bottom-right'
    }),
    MatBottomSheetModule,
    TranslateModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    MatSidenavModule,
    HttpClientModule,
    
  ],
  providers: [
    ToastrService,
    FormControl,
    FormBuilder,
    FormControlName
  ],
  bootstrap: [
    AppComponent,
  ]
})
export class AppModule { }
