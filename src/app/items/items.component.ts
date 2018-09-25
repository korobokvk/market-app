import { Component, OnInit, OnChanges } from '@angular/core';
import { DataService } from '../services/data.service';
// import { Observable } from 'rxjs/index';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css'],
  providers: [DataService]
})
export class ItemsComponent implements OnInit {
  private dataArray: Array<any>;

  constructor(private dataService: DataService) {
    this.dataService.getItemsData().subscribe(data => {
      this.dataArray = [...data];
    }, error => console.error(error));
  }


  ngOnInit() {

  }

}
