import { Component, OnInit, HostListener } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder} from '@angular/forms';
import { DataService } from '../services/data.service';
import { FilterService } from '../services/filter.service';
export interface Cities {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  providers: [FilterService, DataService]
})
export class MenuComponent implements OnInit {
  private filtersDataArray
  public sliderConfigure: any = {
    connect: true,
    step: 1,
    range: null
  };
  public category: Array<object>;
  public innerWidth: number;
  private myForm: FormGroup;
  private cities: Cities[];
  constructor(private fb: FormBuilder, private dataService: DataService, private filterService: FilterService) {
    this.cities = [...this.dataService.getCityFilter()];
    this.category = [...this.dataService.getCategoryFilter()];
    this.sliderConfigure.range = {
      min: this.dataService.getPriceRange()[0],
      max: this.dataService.getPriceRange()[1]
    };
  }
  ngOnInit() {
    this.initForms();
    this.innerWidth = window.innerWidth;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
  }
  initForms() {
    const controls = this.category.map(c => new FormControl(false));
    this.myForm = this.fb.group({
      city: new FormControl(null),
      category: new FormArray(controls),
      price: new FormControl([this.sliderConfigure.range.min, this.sliderConfigure.range.max])
    });
    this.myForm.controls['city'].setValue(this.cities[0].value, {onlySelf: true});
  }

  submit() {
    this.myForm.value.category = this.myForm.value.category
      .map((v, i) => v ? this.category[i]['id'] : null)
      .filter(v => v !== null);
    this.filterService.getFilteredItems(this.myForm.value);
  }


}
