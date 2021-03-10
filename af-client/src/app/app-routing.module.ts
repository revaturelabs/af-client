import { AppComponent } from './app.component';
import { LocationComponent } from './components/location/location.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'locations',
    component: LocationComponent
  }
  // {
  //   path: '',
  //   component: AppComponent
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
