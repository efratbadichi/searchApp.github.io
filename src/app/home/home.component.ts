import { RepoEntity } from './../core/repo-entity';
import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { DataService } from 'src/app/core/data.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  value = '';
  repArray: RepoEntity[];

  asyncReps: Observable<RepoEntity[]>;
  p: number = 1;
  total: number = 0;
  loading: boolean = false;


  constructor(private dataService: DataService) { }

  ngOnInit() {

    //subscribe to package data - will occured on each 'next()' calling
    this.dataService.packageData.subscribe((res: RepoEntity[]) => {
      if (res != null) {
        //hide loading gif
        this.loading = false;
        //save repository array 
        this.repArray = res;
        //save total items - for paging control
        this.total = this.dataService.total_items;
        
        //TODO: check if there are no data, show message, hide loading, etc...
      }
    });
  }

  search(page: number) {
    //show loading gif
    this.loading = true; 
    //save current page
    this.p = page;
    //retrieve data from server according to page number
    this.dataService.findRepositories(this.value, page);
  }

  
}
