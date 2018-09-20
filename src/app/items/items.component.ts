import { Component, OnInit, OnChanges } from '@angular/core';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  private city: string;
  private category: string;
  private sign: string;
  private price: string;
  constructor() { }

  ngOnInit() {
    this.city = 'London';
    this.category = 'Architecture';
    this.sign = "Affiliate Marketing - A Beginner's Guide to Earning Online";
    this.price = "$150"
  }

}
