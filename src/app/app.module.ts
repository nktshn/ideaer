import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApiService } from './services/api.service';
import { MainComponent } from './components/main/main.component';
import { AboutComponent } from './components/about/about.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { LangSwitcherComponent } from './components/UI/lang-switcher/lang-switcher.component';
import { IdeasGeneratorComponent } from './components/ideas-generator/ideas-generator.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BtnComponent } from './components/UI/btn/btn.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    AboutComponent,
    HomeComponent,
    HeaderComponent,
    LangSwitcherComponent,
    IdeasGeneratorComponent,
    BtnComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    ApiService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
