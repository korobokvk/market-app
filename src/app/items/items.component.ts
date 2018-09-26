import { Component, OnInit, OnChanges, OnDestroy} from '@angular/core';
import { DataService } from '../services/data.service';
import { FilterService } from '../services/filter.service';
import { Subject } from 'rxjs/index';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css'],
  providers: [DataService, FilterService]
})
export class ItemsComponent implements OnDestroy {
  private destroy$ = new Subject<void>();
  private dataArray: Array<any>;


  constructor(private dataService: DataService, private filterService: FilterService) {

    this.dataService.getItemsData().subscribe(data => {
      if (Array.isArray(data)) {
        this.dataArray = [...data];
      }
    }, error => console.error(error));

    this.filterService.data$.asObservable().pipe(
      takeUntil(this.destroy$)
    ).subscribe((data) => {
      if (Array.isArray(data)) {
        this.dataArray = [...data];
      }
    });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
