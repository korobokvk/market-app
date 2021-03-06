import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  public data$: Subject<any>;


  constructor(private dataService: DataService) {
    this.data$ = new Subject<any>();
  }

  public getFilteredItems(filters) {
    this.data$.next(filters);
    return this.dataService.getItemsData().subscribe(data => {
     this.filterer(data, filters);
    });
  }
  private filterer(data, filter) {
    const result = data.filter(item => {
      if (filter.city !== 'Select City' && filter.city !== null && item.city !== filter.city) {
        return false;
      }
      if (filter.category.length > 0) {
        return (
          filter.category.includes(item.category) &&
          filter.price[0] <= item.price &&
          filter.price[1] >= item.price
        );
      } else {
        return (
          filter.category.includes(item.category) ||
          filter.price[0] <= item.price ||
          filter.price[1] >= item.price
        );
      }
    });
    this.data$.next(result);
  }

}
