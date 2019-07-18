import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { MyCollectionComponent } from './components/my-collection/my-collection.component';
import { EditIdeaComponent } from './components/edit-idea/edit-idea.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { TextareaAutosizeModule } from 'ngx-textarea-autosize';
import { MyIdeasListComponent } from './components/my-ideas-list/my-ideas-list.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    AboutComponent,
    HomeComponent,
    HeaderComponent,
    LangSwitcherComponent,
    IdeasGeneratorComponent,
    BtnComponent,
    MyCollectionComponent,
    EditIdeaComponent,
    MyIdeasListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    OverlayModule,
    ReactiveFormsModule,
    TextareaAutosizeModule,
  ],
  providers: [
    ApiService,
  ],
  entryComponents: [
    EditIdeaComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
