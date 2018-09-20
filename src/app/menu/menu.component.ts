import { Component, OnInit } from '@angular/core';
export interface Cityes {
  value: string,
  viewValue: string;
}
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  private cities: Cityes[];
  constructor() {
    this.cities = [
      {value: 'london', viewValue: 'London'},
      {value: 'odessa', viewValue: 'Odessa'}
    ]
  }

  ngOnInit() {
  }

}
