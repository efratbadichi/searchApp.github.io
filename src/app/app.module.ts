import { HttpClient } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from 'src/app/home/home.component';
import {MatInputModule, MatButtonModule, MatIconModule, MatCardModule} from '@angular/material';
import { FormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { DataService } from 'src/app/core/data.service';
import { HttpHandler } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { RepositoryItemComponent } from './repository-item/repository-item.component';
import {NgxPaginationModule} from 'ngx-pagination'; 

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RepositoryItemComponent
  ],
  imports: [
RouterModule.forRoot(routes),
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatInputModule,MatButtonModule, MatIconModule,MatCardModule,
    NgxPaginationModule
  ],
  providers: [
    DataService
    
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
