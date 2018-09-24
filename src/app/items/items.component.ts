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
  private city: string;
  private category: string;
  private sign: string;
  private price: string;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getData().subscribe((data) => {
      console.log(JSON.stringify(data));
    });
    this.city = 'London';
    this.category = 'Architecture';
    this.sign = `Affiliate Marketing - A Beginner's Guide to Earning Online`;
    this.price = '$150'
  }

}
