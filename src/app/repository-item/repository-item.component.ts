import { DataService } from 'src/app/core/data.service';
import { RepoEntity } from './../core/repo-entity';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-repository-item',
  templateUrl: './repository-item.component.html',
  styleUrls: ['./repository-item.component.css']
})
export class RepositoryItemComponent implements OnInit {

  @Input() data : RepoEntity;
  
  constructor(private dataService: DataService) { }

  ngOnInit() {
    
  }

  bookmark(){

    //this method calling to server 
    //will not working, bcoz you need web api side
    this.dataService.bookmarkMe(this.data).subscribe((res)=>{
      if (res != null){
        //TODO: show label 'DONE' or another icon instead of button
      }
    })
  }

}
