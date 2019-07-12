import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { AboutComponent } from './components/about/about.component';
import { HomeComponent } from './components/home/home.component';

/**
 * are being used for navigateTo() to avoid paths dublication
 */
export const PATHS = {
  main: '',
  about: 'about'
};

const routes: Routes = [
  {
    path: PATHS.main,
    component: MainComponent,
    children: [
      {
        path: PATHS.main,
        component: HomeComponent,
      },
      {
        path: PATHS.about,
        component: AboutComponent,
      }
    ]
  },
  { path: '**', component: MainComponent, redirectTo: PATHS.main },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
