import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './component/body/home-page/home-page.component';
import { InitPageComponent } from '@component/body/init-page/init-page.component';
import { OtherModuleModule } from './other-module/other-module.module';


const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'init', component: InitPageComponent },
  {
    path: 'other-module',
    loadChildren: () => import('./other-module/other-module.module').then(m => m.OtherModuleModule)
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
