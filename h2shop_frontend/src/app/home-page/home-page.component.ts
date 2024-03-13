import { Component, TemplateRef } from '@angular/core';
import {ColDef} from 'ag-grid-community';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Observer } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
// import { MatBottomSheetRef, MatBottomSheet } from '@angular/material/bottom-sheet';
import { DetailComponent } from '../detail/detail.component';
import {NO_ROW_GRID_TEMPLATE} from '../helpers/constants';
import { TranslateService } from '@ngx-translate/core';
import { HomePageService } from './service-home-page/home-page.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
  item : any;
  color = "#fff"
  hide = false;
  rowData = [
    { make: "Tesla", model: "Model Y", price: 64950, electric: true },
    { make: "Ford", model: "F-Series", price: 33850, electric: false },
    { make: "Toyota", model: "Corolla", price: 29600, electric: false },
  ];
  // rowData = [];

  colDefs : ColDef[]= [
    { headerName: this.translate.instant('COMMON.DOWNLOAD'), field: 'make',minWidth:200, maxWidth:300 , tooltipField: 'make', pinned:'left'},
    { headerName: 'Model', field: 'model', minWidth:200,tooltipField:'model' },
    { headerName: 'Price', field: 'price' ,minWidth:200, tooltipField: 'price'},
    { headerName: 'Electric', field: 'electric' ,minWidth:200, tooltipField:'electric',pinned:'right'},
  ];
  gridApi: any;
  gridColumnApi: any
  position: any;
  noRowsTemplate = NO_ROW_GRID_TEMPLATE.replace('{{field}}', this.translate.instant('TEST_ONLINE.REPORT_INFORMATION_ONLINE'));

  onGridReady(param:any){
    this.gridApi=param.api;
    this.gridColumnApi = param.columnApi
    setTimeout(()=>{
      this.gridApi.sizeColumnsToFit()
    },10)

  }
  gridSizeChange(params:any) {
    params.api.sizeColumnsToFit();
}

  constructor(private dialog: MatDialog,
    private toast: ToastrService,
    private translate: TranslateService,
    private homapageService: HomePageService
    // private bottomSheet: MatBottomSheet
    )
  {
    this.asyncTabs = new Observable((observer: Observer<ExampleTab[]>) => {
      setTimeout(() => {
        observer.next([
          {label: 'First', content: '<div> Conten 1</div>'},
          {label: 'Second', content: 'Content 2'},
          {label: 'Third', content: 'Content 3'},
        ]);
      }, 1000);
    });
  }
  onpenModal(template:TemplateRef<any>){
    this.dialog.open(template)
  }
  asyncTabs: Observable<ExampleTab[]> | any;

  loading(){
    this.hide=true;
    setTimeout(()=>{
      this.hide=false;
      console.log("OK");

    },9000)
  }
  openToast(){
    this.toast.success("Thành công")
  }

  // openMenuBottom(event: any): void{
  //   this.bottomSheet.open(DetailComponent,{

  //   },);
  // }
  testApi(event:any){
    this.homapageService.testApi();
  }
}

export interface ExampleTab {
  label: string;
  content: string;
}
