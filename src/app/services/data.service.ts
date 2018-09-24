import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/index';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public Data = [
    {id: 1, ame: 'Name 1', city: 1, category: 2, price: 50},
    {id: 2, name: 'Name 2', city: 4, category: 1, price: 100},
    {id: 3, name: 'Name 3', city: 5, category: 1, price: 1},
    {id: 4, name: 'Name 4', city: 2, category: 4, price: 150},
    {id: 5, name: 'Name 5', city: 3, category: 5, price: 200}
  ];
  public Category =[
    {id:1,name:'Category 1'},
    {id:2,name:'Category 2'},
    {id:3,name:'Category 3'},
    {id:4,name:'Category 4'},
    {id:5,name:'Category 5'},
  ];

  public City =[
    {id:1,name:'City 1'},
    {id:2,name:'City 2'},
    {id:3,name:'City 3'},
    {id:4,name:'City 4'},
    {id:5,name:'City 5'},
  ];

  public structuredData;


  constructor() {
    this.structuredData = [...this.Data];
    console.log(this.structuredData);
  }

}
