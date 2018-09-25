import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import {Observable} from 'rxjs';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public Data = [
    {id: 1, name: 'Name 1', city: 1, category: 2, price: 50},
    {id: 1, name: 'Name 1', city: 1, category: 2, price: 100},
    {id: 2, name: 'Name 2', city: 4, category: 1, price: 100},
    {id: 3, name: 'Name 3', city: 5, category: 1, price: 1},
    {id: 4, name: 'Name 4', city: 2, category: 4, price: 150},
    {id: 5, name: 'Name 5', city: 3, category: 5, price: 200}
  ];
  public Category = [
    {id: 1, name: 'Category 1'},
    {id: 2, name: 'Category 2'},
    {id: 3, name: 'Category 3'},
    {id: 4, name: 'Category 4'},
    {id: 5, name: 'Category 5'},
  ];

  public City = [
    {id: 1, name: 'City 1'},
    {id: 2, name: 'City 2'},
    {id: 3, name: 'City 3'},
    {id: 4, name: 'City 4'},
    {id: 5, name: 'City 5'},
  ];

  public structuredData;


  constructor() {
    this.structuredData = [];
  }
  public getItemsData(filters?): Observable<any[]> {
    this.structuredData = _.cloneDeep(this.Data);
    console.log(this.structuredData)
    _.forEach(this.structuredData, data => {
     data = this.buildDataObject(data, 'city', this.City);
     data = this.buildDataObject(data, 'category', this.Category);
     delete data.id;
    });

    if (filters) {
      const index = [];
      const filterCategoryBool = [];

      for (const key in filters) {
        if (filters.hasOwnProperty(key)) {
          if (Array.isArray(_.get(filters, key)) && key !== 'price') {
            _.forEach(_.get(filters, key), data => {
              filterCategoryBool.push(_.findIndex(this.structuredData, (val) => {
                console.log(val, key)
                return val[key] === data;
              }));
            });
          }
          index.push(_.findIndex(this.structuredData, (o) => {
            if (key === 'price') {
              const bool = _.reduce( _.get(filters, key), (result, value, keys) => {
                  return _.get(o, key) >= result && _.get(o, key) <= value;
              });
              return bool;
            } else {
              return _.get(o, key) === _.get(filters, key);
            }
          }));
        }
      }
      _.findIndex(this.structuredData, (predicate) => {
        console.log(index, filterCategoryBool)
        if (index.length > 0 && filterCategoryBool.length > 0) {
          const diff = _.difference(index, filterCategoryBool);
          console.log(diff);
        }

      })
    }
    return of(this.structuredData);
  }
  public getCityFilter() {
    const cities = [];
   _.forEach(this.City, data => {
     cities.push({
       value: data.name,
       viewValue: data.name
     });
   });
   return cities;
  }
  public getCategoryFilter() {
    const cities = [];
   _.forEach(this.Category, data => {
     cities.push({
       id: data.name,
       name: data.name
     });
   });
   return cities;
  }
  public getPriceRange() {
    const array = [];
    _.forEach(this.Data, data => {
        array.push(data.price);
    });
    return [Math.min(...array), Math.max(...array)];
  }
  private buildDataObject(childCollection: object, item: string, parentCollection: Array<object>) {
    _.set(childCollection, item, _.get(_.find(parentCollection, (o) => o['id'] === childCollection[item]), 'name'));
    return childCollection;
  }

}
