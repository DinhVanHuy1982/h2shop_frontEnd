import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { DetailComponent } from './detail/detail.component';

const routes: Routes = [
  {path:"home",component:HomePageComponent},
  {path:"detail",component:DetailComponent},
  {path:"**",component:HomePageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
